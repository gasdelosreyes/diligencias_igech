// Create the router
const express=require('express');
const router=express.Router();

// import Controller
const userController=require('../controller/user');

// import Routers
const userRouters= require ('../routes/user');

// Link the http requests
router.route('/').get(userController.getUsers);

// Las rutas primarias están montadas en el archivo de server.js, lee de ahí el string previo
// o sea, /diligence/user/signup
router.route('/signup').post(userController.createUser);

module.exports = router;