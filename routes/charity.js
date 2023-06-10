import express from "express";
import Charity from '../model/charity.js'

const router = express.Router();

// all routes in here are starting with /charity

// Charity
router.get('/:id', async (req, res) => {
  await Charity.findById(req.params.id)
    .then((charities) => { res.json(charities) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.get('/', async (req, res) => {
  await Charity.find()
    .then((charities) => { res.json(charities) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.post('/add', async (req, res) => {
  const name = req.body.name;
  const about = req.body.about;

  const newCharity = new Charity({ name, about, heart: '0' });

  await newCharity.save()
    .then((charities) => { res.json(charities) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.delete('/:id', async (req, res) => {
  await Charity.findByIdAndDelete(req.params.id)
  await Charity.find()
    .then((charities) => { res.json(charities) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

// router.delete('/delete-all', async (req, res) => {
//   await col
//     .then(() => { res.json('Deleted all Charity organizations!') })
//     .catch((err) => { console.log(err) })
//   // .catch((err) => { res.status(400).json('Error: ' + err) })
// });

router.patch('/:id', async (req, res) => {
  const name = req.body.name;
  const about = req.body.about;
  // const image = req.body.image;

  await Charity.updateOne(
    { id: req.params.id },
    { $set: { name, about } }
  )
  await Charity.findOne({ name: req.body.name })
    .then((charity) => { res.json(charity) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

export default router