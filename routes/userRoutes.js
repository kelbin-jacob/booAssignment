const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const currentUser=require('../middlewares/userAuthentication.middleware')

const validator=require('../utils/expressvalidator.util')

// Route to create a new user
router.post('/addUser',currentUser.currentUserAdmin,validator.adduser, userController.createUser);

// Route to login a new user
router.post('/login', userController.login);



module.exports = router;
