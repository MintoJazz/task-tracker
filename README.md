# Task Tracker

Aplicação web para gerenciamento de tarefas desenvolvida como parte de um processo seletivo. Permite criar, listar, editar, marcar como concluída e excluir tarefas.

**Backend:** Node.js · TypeScript · Express  
**Frontend:** Next.js 16 · React 19 · TypeScript · Tailwind CSS · shadcn/ui

---

## Como rodar o projeto

### Pré-requisitos

- Node.js 18+

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

O servidor sobe em `http://localhost:3333`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
```

Abra o `.env.local` e preencha a variável com o endereço do backend:

```env
API_URL=http://localhost:3333
```

Então inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação sobe em `http://localhost:3000`.

> O frontend e o backend precisam estar rodando ao mesmo tempo.

---

## Endpoints da API

| Método   | Rota             | Descrição                |
|----------|------------------|--------------------------|
| `GET`    | `/api/tasks`     | Lista todas as tarefas   |
| `GET`    | `/api/tasks/:id` | Busca uma tarefa pelo ID |
| `POST`   | `/api/tasks`     | Cria uma nova tarefa     |
| `PUT`    | `/api/tasks/:id` | Atualiza uma tarefa      |
| `DELETE` | `/api/tasks/:id` | Remove uma tarefa        |

---

## Arquitetura

### Backend — Arquitetura em Camadas

O backend foi organizado em camadas com responsabilidades bem definidas:

```
src/
├── routes/      → Define os endpoints e mapeia para os controllers
├── controllers/ → Recebe a requisição HTTP, valida e delega ao service
├── services/    → Contém as regras de negócio e manipula os dados
├── models/      → Define os tipos e interfaces da entidade Task
└── database/    → Armazena os dados em memória e controla o ID
```

O fluxo de uma requisição segue sempre a mesma direção:

```
Request → Route → Controller → Service → Database
                                            ↓
Response ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
```

Essa separação garante que cada camada conheça apenas a próxima. O controller não sabe como os dados são armazenados — ele apenas chama o service e devolve a resposta. Na prática, isso significa que trocar o armazenamento em memória por um banco real exige reescrever apenas o `task.service.ts`, sem tocar em controllers ou rotas.

### Frontend — Container/Presentational

O frontend aplica o padrão **Container/Presentational**, separando os componentes que gerenciam lógica dos que apenas renderizam a interface.

**Presentational** — recebem dados via props, sem dependência de fontes externas:
- `task-card.tsx` — renderiza uma tarefa individual com checkbox e ações
- `task-create.tsx` — formulário de criação com estado local do campo de texto
- `task-update.tsx` — modal de edição com estado local do título
- `task-delete.tsx` — dialog de confirmação de exclusão

**Container** — orquestra estado, chama as Server Actions e distribui dados e callbacks:
- `task-container.tsx` — mantém a lista em estado local, implementa as operações com tratamento de erro e passa tudo para os filhos via props

O estado dos modais (aberto/fechado, item selecionado) é gerenciado pelo hook genérico `useManager<T>`, reutilizável para qualquer entidade além de tarefas.

### Server Actions e Optimistic UI

As chamadas à API são feitas via **Server Actions** do Next.js (`actions.ts`), que rodam no servidor. Isso mantém a lógica de comunicação com a API fora dos componentes client e centralizada em um único arquivo.

O `TaskContainer` implementa **Optimistic UI** nas operações de atualização e exclusão: o estado local é atualizado imediatamente, antes da resposta da API, e revertido automaticamente em caso de erro.

---

## Limitações conhecidas e pontos de expansão

O projeto foi entregue como MVP dentro do escopo do processo seletivo. As limitações abaixo são conhecidas e a arquitetura foi estruturada para acomodá-las sem grandes refatorações.

### Persistência em memória

Os dados vivem em um array em memória e são perdidos ao reiniciar o servidor. A camada de service isola completamente a fonte de dados — substituir o array por um banco real exige reescrever apenas o `task.service.ts`.

Opções naturais de evolução:
- **SQLite** — sem servidor, ideal para projetos pequenos
- **PostgreSQL** — robusto, ideal para produção
- **ORM sugerido:** Prisma, que integra bem com TypeScript

### Validação mínima

Atualmente só o campo `title` é validado no controller. A arquitetura permite plugar o `zod` diretamente no service sem alterar o restante do fluxo:

```ts
const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});
```

### Tratamento de erros

O controller usa `if/else` para tratar erros. A evolução natural seria adotar exceções customizadas com um handler centralizado no Express:

```ts
// service lança
if (!task) throw new NotFoundError('Tarefa não encontrada');

// handler trata
if (err instanceof HttpError)
  res.status(err.status).json({ message: err.message });
```

### Autenticação

Não implementada no MVP. Adicionar JWT como middleware no Express não exigiria alterar nenhuma lógica existente:

```ts
taskRouter.use(authMiddleware);
```

### Outros pontos

- **Filtros e paginação** — `GET /api/tasks?status=pending&page=1&limit=10`, isolado no service
- **Testes** — Jest para o service (unitário), Supertest para os endpoints (integração)
- **Documentação da API** — `swagger-ui-express` a partir das rotas existentes