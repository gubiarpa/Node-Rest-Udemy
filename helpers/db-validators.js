const Role = require('../models/role');

const isValidRole = async(role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`The role ${ role } doesn't exist`);
    }
}

module.exports = {
    isValidRole
}