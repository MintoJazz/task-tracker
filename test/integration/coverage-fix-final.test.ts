import { describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createServer } from '../../src/server.js';
import { buildTestRepositories } from '../helpers/fixtures.js';
import { respond } from '../../src/shared/http.js';
import { Card } from '../../src/cards/Card.js';

describe('Fix de Cobertura Final', () => {
  it('cobre createColumn passando wipLimit', async () => {
    const app = createServer(buildTestRepositories());
    const res = await request(app).post('/columns').send({ name: 'Com WIP', wipLimit: 2 });
    expect(res.status).toBe(302);
  });

  it('cobre DuplicateCardTitleError no update', async () => {
    const repos = buildTestRepositories();
    const card1 = Card.create('Card A', 'col-1');
    const card2 = Card.create('Card B', 'col-1');
    repos.cardRepository.save(card1);
    repos.cardRepository.save(card2);
    
    const app = createServer(repos);
    const res = await request(app).post(`/cards/${card2.id}/update`).send({ title: 'Card A' });
    expect(res.status).toBe(409);
  });

  it('cobre fallback de status no redirect do http.ts', () => {
    const res: any = { redirect: vi.fn() };
    respond(res, { redirect: '/' } as any);
    expect(res.redirect).toHaveBeenCalledWith(302, '/');
  });
});
