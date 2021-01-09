const path = require("path");

const fs = require("fs");

const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.get('/', userController.userHome);

router.post('/login', userController.login);

router.post('/register', userController.register);


module.exports = router;




