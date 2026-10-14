import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createServer } from '../../../src/server.js';
import { buildTestRepositories } from '../../helpers/fixtures.js';

describe('GET /', () => {
  it('renderiza o quadro com suas colunas', async () => {
    const app = createServer(buildTestRepositories());
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.text).toContain('Quadro de Teste');
  });
});

describe('POST /columns', () => {
  it('cria uma nova coluna e redireciona', async () => {
    const repos = buildTestRepositories();
    const app = createServer(repos);
    const response = await request(app).post('/columns').send({ name: 'Nova Coluna' });
    expect(response.status).toBe(302);
    
    const cols = repos.boardRepository.getDefault().columns;
    expect(cols[cols.length - 1].name).toBe('Nova Coluna');
  });
});