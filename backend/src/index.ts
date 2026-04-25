import express from 'express'
import cors from 'cors'
import { taskRouter } from './routes/task.routes'

const app = express()
const PORT = 3333

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'HelloWorld!' }))
app.use('/api/tasks', taskRouter);

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))