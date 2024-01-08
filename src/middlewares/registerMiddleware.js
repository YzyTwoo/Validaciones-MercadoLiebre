const {check} = require('express-validator');

const validateRegister = [
    check('firstName').notEmpty().withMessage('Este campo es obligatorio'),
    check('lastName').notEmpty().withMessage('Este campo es obligatorio'),
    check('email')
        .notEmpty().withMessage('Debes completar el email').bail()
        .isEmail().withMessage('Debes colocar un email válido'),
    check('password')
        .notEmpty().withMessage('Debes colocar una contraseña').bail()
        .isLength({ min: 6 }).withMessage('Su contraseña debe tener un mínimo de 6 caracteres').bail()
        .isLength({ max : 16 }).withMessage('Su contraseña debe tener un máximo de 16 caracteres')
];

module.exports = validateRegister