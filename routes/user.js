const path = require("path");

const fs = require("fs");

var jwt = require('jsonwebtoken');

require('dotenv').config();

const express = require("express");

const userController = require("../controllers/user");

const boxcastController = require("../controllers/boxcast");

const router = express.Router();

router.get('/', userController.userHome);

router.post('/login', userController.login);

router.post('/login', userController.login);

router.get(`/channels`, boxcastController.channelsList);

router.get('/broadcasts', boxcastController.broadcastsList);

router.get(`/channeldetail/{id}`, boxcastController.channelDetails);

router.post('/register', userController.register);

router.post('/profile', verifyAuthToken, userController.myProfile);

function verifyAuthToken(req, res, moveNext){    
    const bearerHeader = req.headers['authorization'];
    const userid = parseInt(req.headers['userid']);
    if(typeof bearerHeader == 'undefined'){
        return res.status(403).json({
            "success": false,
            "status_code":403,
            "message": "Unauthorized Access"
        });
    }
    if(typeof userid == 'undefined'){
        return res.status(400).json({
            "success": false,
            "status_code":400,
            "message": "Invalid header parameter"
        });
    }
    else if(typeof bearerHeader != 'undefined' && userid > 0){
        var tokenArr = bearerHeader.split(' ');
        var token = tokenArr[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, authData)=>{
            if(err){
                return res.status(403).json({
                    "success": false,
                    "status_code":403,
                    "message": "Unauthorized Access"
                });
            }
            else if(authData.userid != userid){
                return res.status(403).json({
                    "success": false,
                    "status_code":403,
                    "message": "Unauthorized Access"
                });
            }
            moveNext();
        });        
    }
    else{
        return res.status(500).json({
            "success": false,
            "status_code":500,
            "message": "Internal Server Error"
        });
    }
}





module.exports = router;




