const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJwt = (req = request, res = response, next = () => {}) => {
    
    const token = req.header('x-token');

    // Verify Token Exists
    if (!token) {
        return res.status(401).json({
            msg: 'Token is required'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;
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