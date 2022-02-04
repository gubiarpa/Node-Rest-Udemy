const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { validationResult } = require('express-validator');

const usersGet = (req = request, res = response) => {

  const { q, nombre, apiKey } = req.query;

  res.json({
    msg: `Get Response from Controller and born on ${ process.env.BORN }`,
    q, nombre, apiKey
  });
}

const usersPost = async(req = request, res = response) => {

  // Check if it is a valid email
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Check if email exists
  const emailExists = await User.findOne({email});
  if (emailExists) {
    return res.status(400).json({
      msg: 'Email exists in system'
    });
  }

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save in DB
  await user.save();

  res.json({
    user
  });
}

const usersPut = (req, res = response) => {

  const { id } = req.params;

  res.json({
    msg: 'Put Response from Controller',
    id
  });
}

const usersDelete = (req, res = response) => {
  res.json({
    msg: 'Delete Response from Controller'
  });
}

const usersPatch = (req, res = response) => {
  res.json({
    msg: 'Patch Response from Controller'
  });
}

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch,
}