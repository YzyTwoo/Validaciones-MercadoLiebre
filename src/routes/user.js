const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {check,body} = require('express-validator');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, './public/images')
    },
    filename:(req,file,cb)=>{
        let fileName = `${Date.now()}_img_${file.originalname}`;
        cb(null, fileName);
    }
});

const uploadFile = multer({storage}); 

const validationsRegister= [
    check('first_name').notEmpty().withMessage('Por favor ingrese su NOMBRE'),
    check('last_name').notEmpty().withMessage('Por favor ingrese su APELLIDO'),
    check('numberFile')
        .notEmpty().withMessage('Por favor ingrese su nro de LEGAJO').bail()
        .isNumeric().withMessage('Debe ingresar numeros unicamente'),
    check('category').notEmpty().withMessage('Por favor indique su CATEGORIA'),
    check('email')
        .notEmpty().withMessage('Por favor ingrese su EMAIL').bail()
        .isEmail().withMessage('Por favor, ingrese un EMAIL valido. Por ej: aaa@ddd.com'),
    check('password')
        .notEmpty().withMessage('Por favor ingrese una CONTRASEÑA de 8 digitos').bail()
        .isStrongPassword(minLength )
        .withMessage('La CONTRASEÑA debe contener al menos 8 caracteres, entre ellos una mayuscula')
]

const userController = require('../controllers/usersController')

/* GET users listing. */
router.get('/register', userController.formRegisterUser);
router.post('/register',validationsRegister, userController.userRegister);

router.get('/admin/register', userController.formAdminRegister);
router.post('/admin/register', uploadFile.single('imageAdmin'), userController.adminRegister);

router.get('/login', userController.formLoginUser);
router.get('/admin/login', userController.formAdminLogin);
// Detalle de un usuario
router.get('/:id', controller.show);

module.exports = router;