import express from "express";
import multer from "multer";
import Charity from '../model/charity.js'

const router = express.Router();
const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const upload = multer({
  storage: Storage
}).single('image')

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
  await upload(req, res, (err) => {
    if (err) {
      console.log(err)
    } else {
      const name = req.body.name;
      const about = req.body.about;
      const image = { data: req.file.filename, contentType: 'image/png' };
      console.log(image)

      const newCharity = new Charity({
        name,
        about,
        image,
        heart: '0'
      });

      newCharity.save()
        .then((charities) => { res.json(charities) })
        .catch((err) => { res.status(400).json('Error: ' + err) })
    }
  })
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
  await upload(req, res, (err) => {
    if (err) {
      console.log(err)
    } else {
      const name = req.body.name;
      const about = req.body.about;
      const image = { data: req.file.filename, contentType: 'image/png' };

      Charity.updateOne(
        { id: req.params.id },
        { $set: { name, about, image } }
      )
      Charity.findOne({ name: req.body.name })
        .then((charity) => { res.json(charity) })
        .catch((err) => { res.status(400).json('Error: ' + err) })
    }
  })
});

export default router