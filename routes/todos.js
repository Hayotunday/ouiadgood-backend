import express from "express";
import Todo from '../model/todo.js'

const router = express.Router();

// all routes in here are starting with /notes

// Note
router.get('/:id', async (req, res) => {
  await Todo.find({
    creator: req.params.id
  }).populate('creator')
    .then((todos) => { res.json(todos) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.post('/', async (req, res) => {
  const creator = req.body.creator;
  const title = req.body.title;
  const body = req.body.body;

  const newTodo = new Note({ creator, title, body });

  await newTodo.save()
    .then((todo) => { res.json(todo) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id)
    .then(() => { res.json('Todo deleted!') })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.patch('/:id', async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;

  await Todo.updateOne(
    { id: req.params.id },
    { $set: { title, body } }
  )
    .then((todo) => { res.json(todo) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

export default router