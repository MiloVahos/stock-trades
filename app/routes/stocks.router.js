const express = require('express');
const router = express.Router();
const Trades = require('../models/trades.model');
const _ = require('underscore');

router.get('/stocks/:symbol/trades', (req, res) => {
  const symbol = req.params.symbol;
  const type = req.query.type || 'buy';
  const start = req.query.start || null;
  const end = req.query.end || null;
  Trades.find({ 'type': type,
                'symbol': symbol, 
                "timestamp": { "$gte": start, "$lte": end }})
        .sort({ id: 1 }).exec((err, trades) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if(_.isEmpty(trades)) {
      return res.status(404).json({ message: 'The symbol does not exist' });
    }
    res.status(200).json({ data: trades });
  });
});

router.get('/stocks/:symbol/price', (req, res) => {
  const symbol = req.params.symbol;
  const start = req.query.start || null;
  const end = req.query.end || null;
  Trades.find({ 'symbol': symbol, 
                "timestamp": { "$gte": start, "$lte": end }})
        .sort({ id: 1 }).exec((err, trades) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if(_.isEmpty(trades)) {
      return res.status(404).json({ message: 'There are not trades in the given date range' });
    }
    res.status(200).json({ data: { highest: getMaxPrice(trades), lowest: getMinPrice(trades) } });
  });
});

const getTradesPrices = trades => {
  return trades.map( t => t.price );
}
const getMinPrice = (trades) => {
  return Math.min(...getTradesPrices(trades));
}
const getMaxPrice = (trades) => {
  return Math.max(...getTradesPrices(trades));
}

module.exports = router;