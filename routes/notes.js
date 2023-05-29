import express from "express";
import Note from '../model/note.js'

const router = express.Router();

// all routes in here are starting with /notes

// Note
router.get('/:id', async (req, res) => {
  await Note.find({
    creator: req.params.id
  }).populate('creator')
    .then((notes) => { res.json(notes) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.post('/', async (req, res) => {
  const creator = req.body.creator;
  const title = req.body.title;
  const body = req.body.body;

  const newNote = new Note({ creator, title, body });

  await newNote.save()
    .then((note) => { res.json(note) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
    .then(() => { res.json('Note deleted!') })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.patch('/:id', async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;

  await Note.updateOne(
    { id: req.params.id },
    { $set: { title, body } }
  )
    .then((note) => { res.json(note) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

export default router