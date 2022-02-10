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

module.exports = {
    isValidRole,
    emailExists
}