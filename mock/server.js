// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.patch('/api/tasks/:id/status', (req, res) => {
  const taskId = req.params.id;
  const { statusId } = req.body; // Agora recebemos apenas a chave estrangeira

  const db = router.db;
  const task = db.get('tasks').find({ id: taskId }).value();

  if (!task) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  // Opcional: Valida se o status enviado realmente existe na coleção de statuses
  const statusExists = db.get('statuses').find({ id: statusId }).value();
  if (!statusExists) {
    return res.status(400).json({ error: "Status inválido" });
  }

  // Cria o novo registro de log apenas com o ID do status
  const newLog = {
    id: crypto.randomUUID(),
    statusId: statusId,
    timestamp: new Date().toISOString()
  };

  // Atualiza a tarefa original e anexa o log
  const updatedTask = db.get('tasks')
    .find({ id: taskId })
    .assign({
      currentStatusId: statusId,
      statusLog: [...task.statusLog, newLog]
    })
    .write();

  res.json(updatedTask);
});

server.use(router);
server.listen(3000, () => {
  console.log('API Mock rodando na porta 3000');
});