const { request, response } = require('express');
const User  = require('../models/user');
const jwt = require('jsonwebtoken');

const validateJwt = async(req = request, res = response, next = () => {}) => {
    
    const token = req.header('x-token');

    // Verify Token Exists
    if (!token) {
        return res.status(401).json({
            msg: 'Token is required'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        req.user = user;

        // Verify if user exists
        if (!user) {
            return res.status(401).json({
                msg: 'Invalid Token'
            });
        }

        // Verify if user is active
        if (!user.state) {
            return res.status(401).json({
                msg: 'Invalid Token'
            });
        }

        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Invalid Token'
        });
    }

}

module.exports = {
    validateJwt
}