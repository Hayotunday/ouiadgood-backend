import express from "express";
import Charity from '../model/charity.js'

const router = express.Router();

// all routes in here are starting with /notes

// Note
router.get('/:id', async (req, res) => {
  await Charity.find({
    creator: req.params.id
  })
    .then((charity) => { res.json(charity) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.get('/', async (req, res) => {
  await Charity.find()
    .then((charity) => { res.json(charity) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.post('/add', async (req, res) => {
  const name = req.body.name;
  const about = req.body.about;

  const newCharity = new Note({ name, about, heart: '0' });

  await newCharity.save()
    .then((charity) => { res.json(charity) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.delete('/:id', async (req, res) => {
  await Charity.findByIdAndDelete(req.params.id)
    .then(() => { res.json('Charity Organization deleted!') })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.delete('/delete-all', async (req, res) => {
  await Charity.deleteMany()
    .then(() => { res.json('All Charity Organization deleted!') })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.patch('/:id', async (req, res) => {
  const name = req.body.name;
  const about = req.body.about;

  await Charity.updateOne(
    { id: req.params.id },
    { $set: { name, about } }
  )
    .then((charity) => { res.json(charity) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

export default router