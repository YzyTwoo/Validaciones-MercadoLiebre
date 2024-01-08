const fs = require('fs');
const path = require('path');

const {leerArchivo, cargarArchivo, idUnico} = require('../data/dbLogica')

const userControllers = {
create: (req, res) => {
    res.render('register-form')
},

// Create -  Method to store
store: (req, res) => {
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
}
}

module.exports = userControllers