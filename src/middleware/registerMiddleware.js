const {check} = require('express-validator');

const validateRegister = [
    check('name').notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({min: 3, max:20}).withMessage("El nombre debe tener un mínimo de 3 caracteres y un máximo de 20"),
    check('lastname').notEmpty().withMessage('Este campo es obligatorio')
    .isLength({min: 3, max:20}).withMessage("El nombre debe tener un mínimo de 3 caracteres y un máximo de 20"),
    check('email')
        .notEmpty().withMessage('Debes completar el email').bail()
        .isEmail().withMessage('Debes colocar un email válido'),
    check('password')
        .notEmpty().withMessage('Debes colocar una contraseña').bail()
        .isLength({ min: 6, max : 16 }).withMessage('Su contraseña debe tener un mínimo de 6 caracteres').bail()
        
];

module.exports = validateRegister