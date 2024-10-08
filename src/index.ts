import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from './controller/userController';
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from './controller/todoController';

const app = express();
app.use(express.json()); // Para manejar JSON en requests

// Rutas para usuarios
app.post('/users', async (req, res) => {
  const result = await createUser(req.body);
  res.json(result);
});

app.get('/users', async (req, res) => {
  const result = await getUsers();
  res.json(result);
});

app.get('/users/:id', async (req, res) => {
  const result = await getUserById(req.params.id);
  res.json(result);
});

app.put('/users/:id', async (req, res) => {
  const result = await updateUser(req.params.id, req.body);
  res.json(result);
});

app.delete('/users/:id', async (req, res) => {
  const result = await deleteUser(req.params.id);
  res.json(result);
});

// Rutas para todos
app.post('/todos', async (req, res) => {
  const result = await createTodo(req.body);
  res.json(result);
});

app.get('/todos', async (req, res) => {
  const result = await getTodos();
  res.json(result);
});

app.get('/todos/:id', async (req, res) => {
  const result = await getTodoById(req.params.id);
  res.json(result);
});

app.put('/todos/:id', async (req, res) => {
  const result = await updateTodo(req.params.id, req.body);
  res.json(result);
});

app.delete('/todos/:id', async (req, res) => {
  const result = await deleteTodo(req.params.id);
  res.json(result);
});

// Puerto del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
