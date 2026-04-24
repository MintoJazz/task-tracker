import express from 'express'
import { taskRouter } from './routes/task.routes'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'HelloWorld!' }))
app.use('/api/tasks', taskRouter);

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))