import express from "express";
import multer from "multer";
import Charity from '../model/charity.js'
import mongoose from "mongoose";
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
  const new_image = req.file.buffer.toString('base64') === undefined ? "" : req.file.buffer.toString('base64');
  const ID = new mongoose.Types.ObjectId(req.params.id)
  const { name, about, url } = req.body
  try {
    Charity.findOneAndUpdate(
      { id: ID },
      { name, about, url, image: new_image },
      { new: true }
    ).then((updated) => {
      res.status(200).json({
        name: updated.name,
        about: updated.about,
        url: updated.url,
      })
    }).catch(err => {
      res.status(400).json("Error")
    })
  } catch (error) {
    return res.sendStatus(500)
  }
});

export default router


// router.patch('/:id', upload.single('image'), async (req, res) => {
//   const new_image = req.file.buffer.toString('base64') === undefined ? "" : req.file.buffer.toString('base64');
//   // const ID = new mongoose.Types.ObjectId(req.params.id)
//   try {
//     if (image === "") {
//       Charity.updateOne(
//         { _id: req.params.id },
//         { $set: { name: req.body.name, about: req.body.about, url: req.body.url } }
//       ).then((charity) => { return res.status(200).json(charity) })
//         .catch((err) => { return res.status(400).json('Error: ' + err) })
//     } else {
//       Charity.updateOne(
//         { _id: req.params.id },
//         { $set: { name: req.body.name, about: req.body.about, image: new_image, url: req.body.url } }
//       ).then((charity) => { return res.status(200).json(charity) })
//         .catch((err) => { return res.status(400).json('Error: ' + err) })
//     }
//   } catch (error) {
//     return res.sendStatus(500)
//   }
// });