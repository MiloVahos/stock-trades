const express = require('express');
const router = express.Router();
const Trades = require('../models/trades.model');
const _ = require('underscore');

router.post('/trades', (req, res) => {
  const body = req.body;
  const trade = new Trades(body);
  trade.save((err, result) => {
    if (err) {
      if(err.code === 11000) {
        return res.status(400).json({ message: 'ID must be unique' });
      }
      return res.status(500).json({ err });
    }
    if (!result) {
      return res.status(400).json({ err });
    }
    res.status(201).json({ message: 'Trade was saved successfully', data: result });
  });
});

router.get('/trades', (req, res) => {
  Trades.find({}).sort({ id: 1 }).exec((err, trades) => {
    if (err) {
      return res.status(500).json({ err });
    }
    res.json({ data: trades });
  });
});

router.get('/trades/users/:id', (req, res) => {
  let userID = req.params.id;
  Trades.find({ 'user.id': userID }).sort({ id: 1 }).exec((err, trades) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if(_.isEmpty(trades)) {
      return res.status(404).json({ message: 'The user does not exist' });
    }
    res.status(200).json({ data: trades });
  });
});

module.exports = router;