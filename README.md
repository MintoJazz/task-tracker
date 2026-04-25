# Task Tracker

Aplicação web para gerenciamento de tarefas desenvolvida como parte de um processo seletivo. Permite criar, listar, editar, marcar como concluída e excluir tarefas.

## Tecnologias

**Backend:** Node.js, TypeScript, Express  
**Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui

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
npm run dev
```

A aplicação sobe em `http://localhost:3000`.

> O frontend espera o backend rodando em `http://localhost:3333`. Essa URL é configurada via variável de ambiente `API_URL` no arquivo `.env.local`.

---

## Endpoints da API

| Método   | Rota              | Descrição                  |
|----------|-------------------|----------------------------|
| `GET`    | `/api/tasks`      | Lista todas as tarefas     |
| `GET`    | `/api/tasks/:id`  | Busca uma tarefa pelo ID   |
| `POST`   | `/api/tasks`      | Cria uma nova tarefa       |
| `PUT`    | `/api/tasks/:id`  | Atualiza uma tarefa        |
| `DELETE` | `/api/tasks/:id`  | Remove uma tarefa          |

---

## Arquitetura

### Backend — Arquitetura em Camadas

O backend foi organizado em camadas com responsabilidades bem definidas, seguindo o princípio de separação de responsabilidades:

```
src/
├── routes/          → Define os endpoints e mapeia para os controllers
├── controllers/     → Recebe a requisição HTTP, valida e delega ao service
├── services/        → Contém as regras de negócio e manipula os dados
├── models/          → Define os tipos e interfaces da entidade Task
└── database/        → Armazena os dados em memória e controla o ID
```

O fluxo de uma requisição segue sempre a mesma direção:

```
Request → Route → Controller → Service → Database
                                            ↓
Response ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
```

Essa separação garante que cada camada conheça apenas a próxima. O controller não sabe como os dados são armazenados — ele apenas chama o service e devolve a resposta. Isso significa que trocar o armazenamento em memória por um banco de dados real exigiria reescrever apenas o `task.service.ts`, sem tocar em controllers ou rotas.

O mesmo raciocínio se aplica a validações: hoje a validação é mínima, feita diretamente no controller. Adicionar uma biblioteca como `zod` no futuro seria centralizado no service, sem impacto nas outras camadas.

### Frontend — Separação entre Container e Presentational

O frontend aplica o padrão **Container/Presentational**, que separa os componentes que gerenciam lógica dos componentes que apenas renderizam a interface.

**Componentes Presentational** — recebem dados via props e se preocupam apenas com a aparência:

- `task-card.tsx` — renderiza uma tarefa individual com checkbox e ações
- `task-create.tsx` — formulário de criação com estado local apenas do campo de texto
- `task-update.tsx` — modal de edição com estado local do título
- `task-delete.tsx` — dialog de confirmação de exclusão

**Componente Container** — orquestra o estado, chama as Server Actions e distribui dados e callbacks:

- `task-container.tsx` — mantém a lista de tarefas em estado local, implementa as funções de criação, atualização e exclusão com tratamento de erro, e passa tudo para os componentes filhos via props

Essa separação tem uma vantagem prática: os componentes presentational são previsíveis e fáceis de testar isoladamente, pois não dependem de nenhuma fonte de dados — apenas recebem e exibem o que recebem.

O estado dos modais (aberto/fechado, item selecionado) é gerenciado pelo hook `useManager<T>`, que é genérico e poderia ser reutilizado para qualquer entidade além de tarefas.

### Server Actions e Optimistic UI

As chamadas à API do backend são feitas via **Server Actions** do Next.js (`actions.ts`), que rodam no servidor. Isso mantém a lógica de comunicação com a API fora dos componentes client e centralizada em um único arquivo.

O `TaskContainer` implementa **Optimistic UI** nas operações de atualização e exclusão: o estado local é atualizado imediatamente antes da resposta da API, e revertido automaticamente em caso de erro. Isso garante uma experiência mais fluida ao usuário, sem esperar a confirmação do servidor para refletir a ação na tela.

---

## Pontos de expansão

O projeto foi estruturado pensando em expansibilidade. Um arquivo [`MELHORIAS.md`](./MELHORIAS.md) detalha os principais pontos de evolução identificados, incluindo persistência em banco de dados, autenticação, validação robusta com `zod`, testes automatizados e documentação com Swagger.