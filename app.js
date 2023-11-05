'use strict'
const express = require('express');
const app = express();

app.get('/api/length/:word', (req, res) => {
  const word = req.params.word;
  const length = word.length;
  res.json({ word, length });
});
module.exports = app
