# Potenciais Melhorias — Task Tracker API

## 1. Validação de Dados

Atualmente a validação é mínima (apenas verificação de `title` obrigatório). A arquitetura em camadas permite plugar uma biblioteca de validação como o `zod` diretamente no service ou controller sem alterar o restante do fluxo.

```ts
// Exemplo futuro com zod
const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});
```

---

## 2. Persistência de Dados

Os dados atualmente vivem em memória e são perdidos ao reiniciar o servidor. A camada de service isola completamente a fonte de dados — trocar o array em memória por um banco real exige apenas reescrever o `task.service.ts`, sem tocar em controllers ou rotas.

Opções naturais de evolução:
- **SQLite** — simples, sem servidor, ideal para projetos pequenos
- **PostgreSQL** — robusto, ideal para produção
- **ORM sugerido:** Prisma (integra bem com TypeScript)

---

## 3. Tratamento de Erros Centralizado

O projeto utiliza `if/else` no controller para tratar erros. Uma evolução natural seria adotar o padrão de exceções customizadas já preparado nos arquivos `errors.ts` e `errorHandler.ts`, permitindo que o service lance erros e o handler os trate de forma centralizada — sem nenhum `if/else` nos controllers.

```ts
// service lança
if (!task) throw new NotFoundError('Tarefa não encontrada');

// handler trata
if (err instanceof HttpError)
  res.status(err.status).json({ message: err.message });
```

---

## 4. Autenticação e Autorização

Adicionar autenticação JWT como middleware no Express sem alterar nenhuma lógica existente:

```ts
// Bastaria adicionar o middleware nas rotas protegidas
taskRouter.use(authMiddleware);
```

Com isso viria naturalmente:
- `UnauthorizedError` (401) e `ForbiddenError` (403) nas classes de erro
- Associação de tarefas a usuários

---

## 5. Filtros e Paginação

O endpoint `GET /api/tasks` poderia aceitar query params para filtrar e paginar:

```
GET /api/tasks?status=pending&page=1&limit=10
```

A mudança ficaria isolada no service, sem impacto nas rotas ou controllers.

---

## 6. Testes Automatizados

A separação entre service e controller facilita testes unitários — o service pode ser testado de forma isolada, sem precisar subir o servidor HTTP.

Ferramentas sugeridas:
- **Jest** — testes unitários do service
- **Supertest** — testes de integração dos endpoints

---

## 7. Documentação da API

Adicionar `swagger-ui-express` para gerar documentação interativa automaticamente a partir das rotas existentes, sem reescrever nada.

---

## 8. Variáveis de Ambiente

Extrair configurações como `PORT` para um arquivo `.env`, usando a biblioteca `dotenv`:

```ts
// Atualmente fixo
const PORT = 3000;

// Com dotenv
const PORT = process.env.PORT ?? 3000;
```