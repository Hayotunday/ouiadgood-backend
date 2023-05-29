import express from "express";
import User from "../model/user.js";

const router = express.Router();

// all routes in here are starting with /users

// User
router.get('/', (req, res) => {
  User.find()
    .then((users) => { res.json(users) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((users) => { res.json(users) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.email;

  const newUser = new User({ email, username, password, heart: '0' });

  newUser.save()
    .then(() => { res.json('User added!') })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => { res.json('User deleted!') })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.patch('/', (req, res) => {
  User.updateOne(
    { email: req.body.email },
    { $set: { username: req.body.username } }
  )
    .then(() => { res.json('Username updated!') })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.patch('/resetpassword/', (req, res) => {
  User.updateOne(
    { email: req.body.email },
    { $set: { password: req.body.password } }
  )
    .then(() => { res.json('User password updated!') })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});


// Bookmarks
router.patch('/bookmark', (req, res) => {
  User.updateOne(
    { email: req.body.email },
    { $addToSet: { bookmarks: req.body.bookmark } }
  )
    .then(() => { res.json('Bookmark added!') })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

router.delete('/bookmark/:id', (req, res) => {
  User.updateOne(
    { id: req.params.id },
    { $pull: { bookmarks: req.body.bookmark } }
  )
    .then(() => { res.json('Bookmark deleted!') })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});


// Hearts
router.patch('/heart', (req, res) => {
  User.updateOne(
    { id: req.params.id },
    { $set: { heart: req.body.heart } }
  )
    .then(() => { res.json('Updated Hearts') })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

export default router