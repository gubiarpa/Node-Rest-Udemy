const { request, response } = require('express');
const User = require('../models/user');

const usersGet = (req = request, res = response) => {

  const { q, nombre, apiKey } = req.query;

  res.json({
    msg: `Get Response from Controller and born on ${ process.env.BORN }`,
    q, nombre, apiKey
  });
}

const usersPost = async(req = request, res = response) => {
  const { body } = req;
  const user = new User(body);
  await user.save();
  res.json({
    msg: `Post Response from Controller in ${ process.env.BORN }`,
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