const { Router } = require('express');
const { usersGet, usersPut, usersPost, usersDelete, usersPatch } = require('../controllers/users');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', usersGet);

router.put('/:id', usersPut);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be a string with 6 characthers').isLength({min: 6}),
    check('role', 'It is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('email', 'Invalid email').isEmail(),
    validateFields,
    ],
    usersPost);

router.delete('/', usersDelete);

router.patch('/', usersPatch);

module.exports = router;