const { response } = require('express');

const usersGet = (req, res = response) => {
  res.json({
    msg: 'Get Response from Controller'
  });
}

const usersPut = (req, res = response) => {
  res.json({
    msg: 'Put Response from Controller'
  });
}

const usersPost = (req, res = response) => {
  res.json({
    msg: 'Post Response from Controller'
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