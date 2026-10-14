import { describe, expect, it, test } from 'vitest';
import request from 'supertest';
import { createServer } from '../../../src/server.js';
import { buildTestRepositories } from '../../helpers/fixtures.js';
import { Card } from '../../../src/cards/Card.js';

describe('Rotas de cartões', () => {
  it('POST /cards cria um cartão válido e redireciona para /', async () => {
    const app = createServer(buildTestRepositories());
    const response = await request(app).post('/cards').send({ title: 'Novo cartão', columnId: 'col-1' });
    expect(response.status).toBe(302);
  });

  it('POST /cards rejeita título com menos de 3 caracteres com 400', async () => {
    const app = createServer(buildTestRepositories());
    const response = await request(app).post('/cards').send({ title: 'A', columnId: 'col-1' });
    expect(response.status).toBe(400);
  });

  it('POST /cards rejeita columnId de uma coluna que não existe com 404', async () => {
    const app = createServer(buildTestRepositories());
    const response = await request(app).post('/cards').send({ title: 'Teste', columnId: 'col-invalida' });
    expect(response.status).toBe(404);
  });

  it('POST /cards impede título duplicado na mesma coluna com 409 (Atividade 6)', async () => {
    const repos = buildTestRepositories();
    repos.cardRepository.save(Card.create('Teste Duplicado', 'col-1'));
    const app = createServer(repos);
    const response = await request(app).post('/cards').send({ title: 'Teste Duplicado', columnId: 'col-1' });
    expect(response.status).toBe(409);
  });

  it('POST /cards/:id/move move o cartão para a coluna informada e redireciona para /', async () => {
    const repos = buildTestRepositories();
    const card = Card.create('Mover', 'col-1');
    repos.cardRepository.save(card);
    const app = createServer(repos);
    const response = await request(app).post(`/cards/${card.id}/move`).send({ columnId: 'col-2' });
    expect(response.status).toBe(302);
  });

  it('POST /cards/:id/move responde 404 se o cartão não existe', async () => {
    const app = createServer(buildTestRepositories());
    const response = await request(app).post('/cards/id-invalido/move').send({ columnId: 'col-2' });
    expect(response.status).toBe(404);
  });

  it('POST /cards/:id/move responde 404 se a coluna destino não existe', async () => {
    const repos = buildTestRepositories();
    const card = Card.create('Mover', 'col-1');
    repos.cardRepository.save(card);
    const app = createServer(repos);
    const response = await request(app).post(`/cards/${card.id}/move`).send({ columnId: 'col-invalida' });
    expect(response.status).toBe(404);
  });

  it('POST /cards/:id/move responde 409 se a coluna destino já atingiu o limite de WIP (Atividade 5)', async () => {
    const repos = buildTestRepositories();
    const board = repos.boardRepository.getDefault();
    board.addColumn('WIP Col', 1);
    const wipCol = board.columns[board.columns.length - 1];
    repos.cardRepository.save(Card.create('Ocupando vaga', wipCol.id));

    const card = Card.create('Tentando entrar', 'col-1');
    repos.cardRepository.save(card);

    const app = createServer(repos);
    const response = await request(app).post(`/cards/${card.id}/move`).send({ columnId: wipCol.id });
    expect(response.status).toBe(409);
  });

  it('POST /cards/:id/update edita título/descrição/prioridade e redireciona para /', async () => {
    const repos = buildTestRepositories();
    const card = Card.create('Antigo', 'col-1');
    repos.cardRepository.save(card);
    const app = createServer(repos);
    const response = await request(app).post(`/cards/${card.id}/update`).send({ title: 'Editado', priority: 'alta' });
    expect(response.status).toBe(302);
  });

  it('POST /cards/:id/update responde 404 se o cartão não existe', async () => {
    const app = createServer(buildTestRepositories());
    const response = await request(app).post('/cards/id-invalido/update').send({ title: 'Editado' });
    expect(response.status).toBe(404);
  });

  it('POST /cards/:id/delete remove o cartão e redireciona para /', async () => {
    const repos = buildTestRepositories();
    const card = Card.create('Para deletar', 'col-1');
    repos.cardRepository.save(card);
    const app = createServer(repos);
    const response = await request(app).post(`/cards/${card.id}/delete`);
    expect(response.status).toBe(302);
  });

  it('POST /cards/:id/delete responde 404 se o cartão não existe', async () => {
    const app = createServer(buildTestRepositories());
    const response = await request(app).post('/cards/id-invalido/delete');
    expect(response.status).toBe(404);
  });

  test.todo('GET /cards/:id renderiza a página de detalhe do cartão (Atividade 8)');
  test.todo('GET /cards/search?query=termo retorna só os cartões cujo título combina (Atividade 9)');
});