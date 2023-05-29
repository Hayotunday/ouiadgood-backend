import express from "express";
import Money from "../model/money.js";

const router = express.Router();

// all routes in here are starting with /money

// Money
router.get('/', async (req, res) => {
  await Money.find()
    .then((money) => { res.json(money) })
    .catch((err) => { res.status(400).json('Error: ' + err) })
});

export default router