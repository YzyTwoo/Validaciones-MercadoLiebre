const express = require('express');
const router = express.Router();
const {store, create} = require('../controllers/usersController');
const validateRegister = require('../middleware/registerMiddleware')

//  CREATE USERS ***/ 
router.get('/register', create); 
router.post('/register',validateRegister, store); 

module.exports = router