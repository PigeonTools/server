import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import { app } from '../../src/index.ts';

// Helper to create a server and return a cleanup function
const createServer = () => {
  const server = app.listen(0);
  const addr = server.address();
  assert(typeof addr === 'object' && addr && 'port' in addr);
  return {
    server,
    url: `http://localhost:${addr.port}`,
    close: () => new Promise((resolve) => server.close(resolve))
  };
};

describe('Dice API', () => {
  it('valid dice string', async () => {
    const { url, close } = createServer();
    
    try {
      const res = await request(url).post('/dice').send({ diceString: '2d6' });
      assert.strictEqual(res.statusCode, 200);
      assert.ok(res.body.result || res.body.total);
    } finally {
      await close(); // Ensure server closes even if test fails
    }
  });

  it('invalid dice string', async () => {
    const { url, close } = createServer();
    
    try {
      const res = await request(url).post('/dice').send({ diceString: 'invalid' });
      assert.strictEqual(res.statusCode, 500);
      assert.ok(res.text.includes('Failed to parse'));
    } finally {
      await close();
    }
  });

  it('missing diceString', async () => {
    const { url, close } = createServer();
    
    try {
      const res = await request(url).post('/dice').send({});
      assert.strictEqual(res.statusCode, 500);
      assert.ok(res.text.includes('Failed to parse'));
    } finally {
      await close();
    }
  });
});
