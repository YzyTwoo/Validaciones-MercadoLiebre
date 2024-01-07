const { log } = require('console');
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator')

const userController = {
    formRegisterUser:(req,res,next)=>{
        res.render('form-register-user');
    },
    formAdminRegister:(req,res,next)=>{
         res.send('Aqui se registraran solo Administradores con permisos')
        res.render('form-register-admin');
    },
    userRegister:(req,res,next)=>{
        res.redirect('/user/login');
    },
    adminRegister:(req,res,next)=>{
        const validationResult = validationResult(req);
        if (validationResult.errors.length > 0){
            res.render('form-register-admin', {
                errors:validationResult.mapped(),
                oldData: req.body
            })
        }
         return res.send("Ya te has registrado")
         res.redirect('/user/admin/register');
    },
    formLoginUser:(req,res,next)=>{
        res.render('form-login-user');
    },
    formAdminLogin:(req,res,next)=>{
        res.send('Aqui se van a loguear los Administradores que tengan permisos')
         res.render('form-login-admin');
    },
   
}


module.exports = userController;