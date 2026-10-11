import express from 'express';
import { createDatabase } from './database.js';
import { validateContact } from './contactValidation.js';

const rateWindowMs = 15 * 60 * 1000;
const rateLimitCount = 5;

function corsMiddleware(allowedOrigins) {
  return (request, response, next) => {
    const origin = request.get('origin');

    if (origin && !allowedOrigins.has(origin)) {
      return response.status(403).json({
        error: { code: 'ORIGIN_NOT_ALLOWED', message: 'This origin is not allowed.' },
      });
    }

    if (origin) {
      response.set('Access-Control-Allow-Origin', origin);
      response.set('Vary', 'Origin');
    }

    response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '600');

    if (request.method === 'OPTIONS') return response.sendStatus(204);
    return next();
  };
}

export function createApp({
  databasePath,
  allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'],
  now = Date.now,
  trustProxy = false,
} = {}) {
  const app = express();
  const store = createDatabase(databasePath);
  const limitsByAddress = new Map();
  const allowedOriginSet = new Set(allowedOrigins);

  app.disable('x-powered-by');
  app.set('trust proxy', trustProxy);
  app.use(corsMiddleware(allowedOriginSet));
  app.use(express.json({ limit: '10kb', strict: true }));

  app.get('/api/health', (_request, response) => {
    try {
      store.database.prepare('SELECT 1').get();
      return response.json({ status: 'ok' });
    } catch (error) {
      console.error('Health check database query failed', error);
      return response.status(503).json({
        error: { code: 'SERVICE_UNAVAILABLE', message: 'The service is temporarily unavailable.' },
      });
    }
  });

  app.post('/api/contact', (request, response) => {
    const currentTime = now();
    const address = request.ip ?? request.socket.remoteAddress ?? 'unknown';
    const activeWindow = (limitsByAddress.get(address) ?? [])
      .filter((timestamp) => currentTime - timestamp < rateWindowMs);

    if (activeWindow.length >= rateLimitCount) {
      limitsByAddress.set(address, activeWindow);
      response.set('Retry-After', String(Math.ceil((rateWindowMs - (currentTime - activeWindow[0])) / 1000)));
      return response.status(429).json({
        error: { code: 'RATE_LIMITED', message: 'Too many messages. Please wait before trying again.' },
      });
    }

    activeWindow.push(currentTime);
    limitsByAddress.set(address, activeWindow);

    if (limitsByAddress.size > 5000) {
      for (const [clientAddress, timestamps] of limitsByAddress) {
        if (!timestamps.some((timestamp) => currentTime - timestamp < rateWindowMs)) {
          limitsByAddress.delete(clientAddress);
        }
      }
    }

    const { errors, values } = validateContact(request.body);
    if (Object.keys(errors).length) {
      return response.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'Please correct the highlighted fields.', fields: errors },
      });
    }

    try {
      const result = store.insertContact.run(
        values.name,
        values.email,
        values.subject,
        values.message,
        values.organization,
      );
      return response.status(201).json({ status: 'saved', id: Number(result.lastInsertRowid) });
    } catch (error) {
      console.error('Contact submission could not be stored', error);
      return response.status(500).json({
        error: { code: 'STORAGE_ERROR', message: 'Your message could not be saved. Please try again.' },
      });
    }
  });

  app.use((error, _request, response, next) => {
    if (response.headersSent) return next(error);

    if (error?.type === 'entity.too.large') {
      return response.status(413).json({
        error: { code: 'PAYLOAD_TOO_LARGE', message: 'The request is larger than the allowed limit.' },
      });
    }

    if (error instanceof SyntaxError && 'body' in error) {
      return response.status(400).json({
        error: { code: 'INVALID_JSON', message: 'The request body must be valid JSON.' },
      });
    }

    console.error('Unhandled API error', error);
    return response.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'The request could not be completed.' },
    });
  });

  return { app, close: store.close };
}
