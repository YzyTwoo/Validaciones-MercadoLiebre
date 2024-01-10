const {check} = require('express-validator');

const validationLogin = [
    check('email').isEmail().withMessage('Email inválido'),
    check('password').notEmpty().withMessage('Este campo es obligatorio'),bail()
    .isLength({min:6}),withMessage('La contraseña debe tener al menos 6 caracteres')
]

module.exports = validationLogin