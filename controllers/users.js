const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = async(req = request, res = response) => {

  const { uid } = req;
  const { from = 0, limit = 5 } = req.query;
  const query = { state: true };

  const [totalRows, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(from).limit(limit)
  ]);
    
  res.json({
    uid,
    totalRows,
    users
  });
}

const usersPost = async(req = request, res = response) => {

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

const usersPut = async(req, res = response) => {
  
  const { id } = req.params;
  const { _id, password, google, email, ...payload } = req.body;
  
  // TODO: Valid againt database
  if (password) {
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    payload.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await User.findByIdAndUpdate(id, payload);

  res.json({
    usuario
  });
}

const usersDelete = async(req, res = response) => {

  const { id } = req.params;

  // We do physycal elimination
  const user = await User.findByIdAndDelete(id);

  res.json({
    user
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