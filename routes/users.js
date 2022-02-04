const { Router } = require('express');
const { usersGet, usersPut, usersPost, usersDelete, usersPatch } = require('../controllers/users');
const { check } = require('express-validator');

const router = Router();

router.get('/', usersGet);

router.put('/:id', usersPut);

router.post('/', [
    check('email', 'Invalid email').isEmail(),
    ],
    usersPost);

router.delete('/', usersDelete);

router.patch('/', usersPatch);

module.exports = router;