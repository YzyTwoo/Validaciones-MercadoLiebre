const fs = require('fs');
const path = require('path');

const {leerArchivo, cargarArchivo, idUnico} = require('../data/dbLogica');
const {validationResult} = require('express-validator');

const userControllers = {
create: (req, res) => {
    res.render('register-form')
},

store: (req, res) => {
    let errors = validationResult(req);

    if(errors.isEmpty()){
    const { firstName, lastName, email, password } = req.body;

    let archivo = leerArchivo('usersDataBase');

    const newId = idUnico();

    const newArray = {
        id: newId,
        firstName,
        lastName,
        email,
        password,
    };

    let newArchivo = [...archivo, newArray]
    cargarArchivo(newArchivo, 'usersDataBase');

    res.redirect('/');
    }else{
        res.render('register-form', {errors: errors.mapped(), old: req.body});
    }
},
}

module.exports = userControllers