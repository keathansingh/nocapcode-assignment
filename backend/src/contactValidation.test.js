import assert from 'node:assert/strict';
import test from 'node:test';
import { validateContact } from './contactValidation.js';

const validPayload = {
  name: 'Asha Patel',
  email: 'asha@example.com',
  subject: 'Identity question',
  message: 'Please share more about the design.',
};

test('accepts valid contact details and trims whitespace', () => {
  const { errors, values } = validateContact({ ...validPayload, name: ' Asha Patel ' });
  assert.deepEqual(errors, {});
  assert.equal(values.name, 'Asha Patel');
});

test('rejects missing required fields and invalid email addresses', () => {
  const { errors } = validateContact({ name: '', email: 'bad', subject: '', message: '' });
  assert.ok(errors.name);
  assert.ok(errors.email);
  assert.ok(errors.subject);
  assert.ok(errors.message);
});

test('rejects values over the field limits', () => {
  const { errors } = validateContact({ ...validPayload, message: 'm'.repeat(5001) });
  assert.match(errors.message, /5000/);
});
