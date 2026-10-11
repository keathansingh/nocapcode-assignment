import { createApp } from './app.js';
import process from 'node:process';

const port = Number(process.env.PORT ?? 3001);
const allowedOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const trustProxySetting = process.env.TRUST_PROXY ?? '';
if (trustProxySetting && trustProxySetting !== 'true' && !/^\d+$/.test(trustProxySetting)) {
  throw new Error('TRUST_PROXY must be "true" or a hop count.');
}
const trustProxy = trustProxySetting === 'true' ? 1 : Number(trustProxySetting);
const { app, close } = createApp({ allowedOrigins, trustProxy });
const server = app.listen(port, () => {
  console.info(`PPSTU API listening on port ${port}`);
});

function shutdown() {
  server.close(() => {
    close();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
