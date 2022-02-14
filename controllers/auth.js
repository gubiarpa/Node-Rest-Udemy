const bcrypt = require('bcryptjs/dist/bcrypt');
const { request, response } = require('express');
const { generateJwt } = require('../helpers/generateJwt');
const User = require('../models/user');

const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        // Verify is email exists
        if (!user) {
            return res.status(400).json({
                msg: 'Incorrect User/Password: Email'
            });
        }
        
        // Verify if user is active
        if (!user.state) {
            return res.status(400).json({
                msg: 'Incorrect User/Password: Status'
            });
        }
        
        // Verify password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Incorrect User/Password: Password'
            });
        }

        // Generate JWT
        const token = await generateJwt(user.id);
        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Contact your administrator'
        });
    }
    
}

module.exports = {
    login
}