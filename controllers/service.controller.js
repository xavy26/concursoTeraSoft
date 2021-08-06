'use strict'

const Service = require('../models/services.model');

exports.test = (req, res) => {
  res.end('Testing service controller');
};

exports.register = (req, res) => {
  if (req.body.name && req.body.time) {

  }
}