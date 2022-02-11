const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`The role ${ role } doesn't exist`);
    }
}

const emailExists = async(email = '') => {
    const _emailExists = await User.findOne({ email });
    if (_emailExists) {
        throw new Error(`The email ${ email } exists`);
    }
}

const userExistsById = async(id) => {
    const _userExists = await User.findById(id);
    if (_userExists) {
        throw new Error(`The user with id ${ id } doesn't exist`);
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userExistsById
}