import express from 'express';
import { createConnection } from 'typeorm';
import { Todo as TodoModel } from './model/Todo';

(async () => {
  const app = express();

  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'bineetnaidu',
    database: 'todo_db',
    entities: [TodoModel],
  });

  app.use(express.json());

  const Todo = connection.getRepository(TodoModel);

  app.get('/', async (req, res) => {
    try {
      const todos = await Todo.find({});
      res.json({
        data: todos,
        length: todos.length || 0,
        success: !!todos,
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  });

  app.post('/', async (req, res) => {
    try {
      const { task, completed } = req.body;
      const basetodo = await Todo.create({
        completed,
        task,
        id: Math.floor(Math.random() * Math.random() * 12),
      });
      const todo = await Todo.save(basetodo);
      res.json({
        data: todo,
        success: !!todo,
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  });

  app.get('/:id', async (req, res) => {
    const todo = await Todo.findOne(req.params.id);
    if (!todo) {
      throw new Error('Todo Not found');
    }
    res.json({
      data: todo,
      success: !!todo,
    });
  });

  app.put('/:id', async (req, res) => {
    try {
      const basetodo = await Todo.findOne(req.params.id);
      if (!basetodo) {
        throw new Error('Todo Not found');
      }
      Todo.merge(basetodo, req.body);
      const todo = await Todo.save(basetodo);
      res.json({
        data: todo,
        success: !!todo,
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  });

  app.delete('/:id', async (req, res) => {
    const todo = await Todo.delete(req.params.id);
    if (!todo) {
      throw new Error('Todo Not found');
    }
    res.json({
      success: todo.affected === 1,
    });
  });

  app.listen(4242, () => {
    console.log('server started');
  });
})();
