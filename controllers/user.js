const User = require('../models/user');

const nodemailer = require('nodemailer');

const bcrypt = require('bcryptjs')

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.userHome = (req, res, next) => {
  return res.status(200).json({"status":200, "msg":"Welcome to chatterbox"});
};

exports.login = (req, res, next) => {

  var responseFormat = {
    "success": false,
    "status_code":'',
    "message": "",
    "data": {}
  };

  let email = req.body.email;
  let pass = req.body.pass;
  if(typeof email == 'undefined' || email == '' || typeof pass == 'undefined' || pass == ''){
    responseFormat.status_code = 400;
    responseFormat.message = "Please enter email address and password";
    return res.status(400).json(responseFormat);
  }
  if(!emailRegexp.test(email)){
    responseFormat.status_code = 400;
    responseFormat.message = "Please enter valid email address";
    return res.status(400).json(responseFormat);
  }
  User.findUserByEmail(email)
  .then(([results, fieldData])=>{
    if(results.length == 0){
      responseFormat.status_code = 400;
      responseFormat.message = "User does not exist with this email address";
      return res.status(400).json(responseFormat);
    }
    else if(results[0].active != 1){
      responseFormat.status_code = 400;
      responseFormat.message = "Your account is inactive or suspended";
      return res.status(400).json(responseFormat);
    }
    else{      
      bcrypt.compare(pass, results[0].password, function(err, isPasswordMatch) {
        if(isPasswordMatch){
          responseFormat.success = true;
          responseFormat.status_code = 200;
          responseFormat.message = 'User login successfully';
          responseFormat.data = {
            "first_name":results[0].first_name,
            "last_name":results[0].last_name,
            "email_address":results[0].email_address
          }
          return res.status(200).json(responseFormat);
        }
        else{
          responseFormat.status_code = 400;
          responseFormat.message = "You have entered wrong password";
          return res.status(400).json(responseFormat);
        }
      });
    }
  })
  .catch((loginErr)=>{
    console.log("loginErr", loginErr);
  })

};

exports.register = (req, res, next) => {

  var responseFormat = {
    "success": false,
    "status_code":'',
    "message": "",
    "data": {}
  };

  console.log("Inside register...");
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email_address = req.body.email_address;
  let confirm_email_address = req.body.confirm_email_address;
  let password = req.body.password;
  let confirm_password = req.body.confirm_password;

  if(typeof first_name == 'undefined' || first_name == ''){
    responseFormat.status_code = 400;
    responseFormat.message = "First name is required";
    return res.status(400).json(responseFormat);
  }
  if(typeof last_name == 'undefined' || last_name == ''){
    responseFormat.status_code = 400;
    responseFormat.message = "Last name is required";
    return res.status(400).json(responseFormat);
  }
  if(typeof email_address == 'undefined' || email_address == ''){
    responseFormat.status_code = 400;
    responseFormat.message = "Please provide email address";
    return res.status(400).json(responseFormat);
  }
  if(typeof password == 'undefined' || password == ''){
    responseFormat.status_code = 400;
    responseFormat.message = "Please provide password";
    return res.status(400).json(responseFormat);
  }
  if(password.length < 6 || password.length > 20){
    responseFormat.status_code = 400;
    responseFormat.message = "Please enter password between [6-20] chars";
    return res.status(400).json(responseFormat);
  }
  if(email_address != confirm_email_address){
    responseFormat.status_code = 400;
    responseFormat.message = "Email address and confirm email should be same";
    return res.status(400).json(responseFormat);
    
  }
  if(password != confirm_password){
    responseFormat.status_code = 400;
    responseFormat.message = "Password and confirm password should be same";
    return res.status(400).json(responseFormat);
  }
  
  if(!emailRegexp.test(email_address)){
    responseFormat.status_code = 400;
    responseFormat.message = "Please provide valid email address";
    return res.status(400).json(responseFormat);
  }

  User.findUserByEmail(email_address)
  .then(([emailResults, fieldData])=>{
    if(emailResults.length == 0){
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hashPassword) => {
          if(err) throw err; 
          User.addUser(first_name, last_name, email_address, hashPassword)
          .then((result) => {
              responseFormat.success = true;
              responseFormat.status_code = 200;
              responseFormat.message = 'User registered successfully';
              return res.status(200).json(responseFormat);
          })
          .catch((userErr) => {
            console.log("userErr", userErr);
            responseFormat.status_code = 400;
            responseFormat.message = "Internal server error";
            return res.status(400).json(responseFormat);
          })
        })
      });      
    }
    else{
      responseFormat.status_code = 400;
      responseFormat.message = "User already exist with same email address";
      return res.status(400).json(responseFormat);
    }    
  }).catch((emailErr)=>{
    console.log("emailErr", emailErr);
    responseFormat.status_code = 400;
    responseFormat.message = "Internal server error";
    return res.status(400).json(responseFormat);
  });

};
