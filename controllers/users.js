const { request, response } = require('express');

const usersGet = (req = request, res = response) => {

  const { q, nombre, apiKey } = req.query;

  res.json({
    msg: 'Get Response from Controller',
    q, nombre, apiKey
  });
}

const usersPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  res.json({
    msg: `Post Response from Controller to ${ nombre } who will be ${ edad + 1 }`
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