import express from "express";
import multer from "multer";
import Charity from '../model/charity.js'

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() })

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

router.post('/add', upload.single('image'), async (req, res) => {
  const name = req.body.name;
  const about = req.body.about;
  const url = req.body.url;
  const image = req.file.buffer.toString('base64') === undefined ? "" : req.file.buffer.toString('base64');

  const newCharity = new Charity({
    name,
    about,
    image,
    url,
    heart: '0'
  });

  newCharity.save()
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

router.patch('/:id', upload.single('image'), async (req, res) => {
  const image = req.file.buffer.toString('base64') === undefined ? "" : req.file.buffer.toString('base64');

  try {
    if (image === "") {
      Charity.updateOne(
        { id: req.params.id },
        { $set: { name: req.body.name, about: req.body.about, url: req.body.url } }
      )
      Charity.findOne({ name: req.body.name })
        .then((charity) => { return res.status(200).json(charity) })
        .catch((err) => { return res.status(400).json('Error: ' + err) })
    } else {
      Charity.updateOne(
        { id: req.params.id },
        { $set: { name: req.body.name, about: req.body.about, image: req.body.image, url: req.body.url } }
      )
      Charity.findOne({ name: req.body.name })
        .then((charity) => { return res.status(200).json(charity) })
        .catch((err) => { return res.status(400).json('Error: ' + err) })
    }
  } catch (error) {
    return res.sendStatus(500)
  }
});

export default router