const express = require('express');
const router = express.Router();
const { signupValidator, signinValidator, validatorResult } = require('../middleware/validator');
const { signupController, signinController,updateUserController, deleteUserController,getUserInfo, getUserInfoById} = require('../controllers/auth');
const Buyer = require('../models/Buyer');

//Save details
router.post('/signup', signupValidator, validatorResult, signupController);
router.post('/signin', signinValidator, validatorResult, signinController);

//user update
//router.patch('/update/:id', userUpdateValidator, validatorResult, updateUserController);

//Get all the details
router.get("/user1", getUserInfo);

//Specific data retrive
router.get("/user/:id",getUserInfoById);

//User delete
router.delete("/delete/:id", deleteUserController);






module.exports = router;