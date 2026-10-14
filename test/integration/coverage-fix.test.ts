import { describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createServer } from '../../src/server.js';
import { buildTestRepositories } from '../helpers/fixtures.js';
import { respond } from '../../src/shared/http.js';
import { Board } from '../../src/boards/Board.js';
import { Card } from '../../src/cards/Card.js';

describe('Fix de Cobertura (Edge Cases e Atividades Opcionais)', () => {
  it('cobre rotas não implementadas (Atividades 8 e 9)', async () => {
    const app = createServer(buildTestRepositories());
    expect((await request(app).get('/cards/123')).status).toBe(501);
    expect((await request(app).get('/cards/search?query=x')).status).toBe(501);
  });

  it('cobre criação de coluna sem passar wipLimit', async () => {
    const app = createServer(buildTestRepositories());
    expect((await request(app).post('/columns').send({ name: 'Sem WIP' })).status).toBe(302);
  });

  it('cobre addColumn em um quadro vazio', () => {
    const board = Board.create('id', 'Vazio', []);
    expect(board.addColumn('Nova').order).toBe(1);
  });

  it('cobre update de cartão alterando apenas a descrição', async () => {
    const repos = buildTestRepositories();
    repos.cardRepository.save(Card.create('Teste', 'col-1'));
    const card = repos.cardRepository.findAll()[0];
    const app = createServer(repos);
    
    await request(app).post(`/cards/${card.id}/update`).send({ description: 'Nova desc' });
    expect(repos.cardRepository.findById(card.id)?.description).toBe('Nova desc');
  });

  it('cobre respond() do http.ts quando não há view nem redirect', () => {
    const res: any = { status: vi.fn().mockReturnThis(), send: vi.fn() };
    respond(res, { status: 204 });
    expect(res.send).toHaveBeenCalled();
  });
});
