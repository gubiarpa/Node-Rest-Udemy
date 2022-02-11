const { Router } = require('express');
const { usersGet, usersPut, usersPost, usersDelete, usersPatch } = require('../controllers/users');

const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, emailExists, userExistsById } = require('../helpers/db-validators');

const router = Router();

router.get('/', usersGet);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isValidRole),
    validateFields,
    ],
    usersPut);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be a string with 6 characthers').isLength({min: 6}),
    check('role').custom(isValidRole),
    check('email', 'Invalid email').isEmail(),
    check('email', 'Email exists').custom(emailExists),
    validateFields,
    ],
    usersPost);

router.delete('/', usersDelete);

router.patch('/', usersPatch);

module.exports = router;