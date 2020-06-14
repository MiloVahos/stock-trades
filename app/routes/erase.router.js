const express = require('express');
const router = express.Router();
const Trades = require('../models/trades.model');

router.delete('/erase', (req, res) => {
  Trades.deleteMany({}, (error, result) => {
    if(error) {
      res.status(500);
      res.send({ message: 'Something went wrong in the database' });
    } else {
      res.status(200);
      res.send({ message: `${result.deletedCount} trades were deleted`});
    }
  });
});

module.exports = router;