const jwt = require('jsonwebtoken');

const generateJwt = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                console.log('Failed to generate token');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJwt
}