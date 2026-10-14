import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createServer } from '../../src/server.js';
import { createSeededRepositories } from '../../src/seed.js';

describe('Estado inicial: visualização do quadro', () => {
  it('GET / mostra o quadro', async () => {
    const app = createServer();
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Quadro do Projeto');
  });
});

describe('Jornada completa', () => {
  it('criar cartão → mover para "Em Andamento" → editar → mover para "Concluído" → excluir', async () => {
    const repos = createSeededRepositories();
    const app = createServer(repos);

    await request(app).post('/cards').send({ title: 'Card E2E', columnId: 'col-todo', priority: 'baixa' });
    
    const createdCard = repos.cardRepository.findAll().find(c => c.title === 'Card E2E');
    expect(createdCard).toBeDefined();

    await request(app).post(`/cards/${createdCard!.id}/move`).send({ columnId: 'col-doing' });
    expect(repos.cardRepository.findById(createdCard!.id)?.columnId).toBe('col-doing');

    await request(app).post(`/cards/${createdCard!.id}/update`).send({ title: 'Card E2E Editado' });
    expect(repos.cardRepository.findById(createdCard!.id)?.title).toBe('Card E2E Editado');

    await request(app).post(`/cards/${createdCard!.id}/move`).send({ columnId: 'col-done' });
    expect(repos.cardRepository.findById(createdCard!.id)?.columnId).toBe('col-done');

    await request(app).post(`/cards/${createdCard!.id}/delete`);
    expect(repos.cardRepository.findById(createdCard!.id)).toBeUndefined();
  });
});