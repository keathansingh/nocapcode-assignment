import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { createApp } from './app.js';
import { createDatabase } from './database.js';

const validPayload = {
  name: 'Asha Patel',
  email: 'asha@example.com',
  subject: 'Identity question',
  message: 'Please share more about the design.',
};

async function startTestApi(t) {
  const directory = await mkdtemp(join(tmpdir(), 'ppstu-api-'));
  const databasePath = join(directory, 'contact.sqlite');
  const { app, close } = createApp({ databasePath });
  const server = createServer(app);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  t.after(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
      server.closeIdleConnections();
    });
    close();
    await rm(directory, { recursive: true, force: true });
  });

  return { baseUrl: `http://127.0.0.1:${server.address().port}`, databasePath };
}

test('health responds without exposing storage details', async (t) => {
  const { baseUrl } = await startTestApi(t);
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('contact submission validates, stores persistently, and has no public listing endpoint', async (t) => {
  const { baseUrl, databasePath } = await startTestApi(t);
  const invalidResponse = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...validPayload, email: 'invalid' }),
  });
  assert.equal(invalidResponse.status, 400);
  assert.ok((await invalidResponse.json()).error.fields.email);

  const savedResponse = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validPayload),
  });
  assert.equal(savedResponse.status, 201);
  assert.equal((await savedResponse.json()).status, 'saved');

  const listingResponse = await fetch(`${baseUrl}/api/contact`);
  assert.equal(listingResponse.status, 404);

  const database = createDatabase(databasePath);
  const saved = database.database.prepare(
    'SELECT name, email, subject, message FROM contact_submissions WHERE id = 1',
  ).get();
  assert.deepEqual({ ...saved }, validPayload);
  database.close();
});

test('request body limits and configured CORS origins are enforced', async (t) => {
  const { baseUrl } = await startTestApi(t);
  const largeResponse = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...validPayload, unused: 'x'.repeat(12_000) }),
  });
  assert.equal(largeResponse.status, 413);

  const corsResponse = await fetch(`${baseUrl}/api/health`, {
    headers: { Origin: 'https://untrusted.example' },
  });
  assert.equal(corsResponse.status, 403);
});

test('public contact submissions are rate limited', async (t) => {
  const { baseUrl } = await startTestApi(t);
  const responses = [];

  for (let index = 0; index < 6; index += 1) {
    responses.push(await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validPayload),
    }));
  }

  assert.deepEqual(responses.map((response) => response.status), [201, 201, 201, 201, 201, 429]);
  assert.ok(responses.at(-1).headers.get('retry-after'));
});

test('database write failures return a safe server error', async (t) => {
  const { baseUrl, databasePath } = await startTestApi(t);
  const database = createDatabase(databasePath);
  database.database.exec('DROP TABLE contact_submissions');
  database.close();

  const response = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validPayload),
  });
  const body = await response.json();
  assert.equal(response.status, 500);
  assert.equal(body.error.code, 'STORAGE_ERROR');
  assert.doesNotMatch(body.error.message, /database|sqlite|sql/i);
});
