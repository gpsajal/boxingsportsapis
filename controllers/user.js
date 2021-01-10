const User = require('../models/user');

var moment = require('moment'); 

exports.userHome = (req, res, next) => {
  return res.status(200).json({"status":200, "msg":"Welcome to chatterbox"});
};

exports.login = (req, res, next) => {
  return res.status(200).json({"status":200, "msg":"Welcome to chatterbox login"});
};

exports.register = (req, res, next) => {
  console.log("Inside register...........", req.body);
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email_address = req.body.email_address;
  let confirm_email_address = req.body.confirm_email_address;
  let password = req.body.password;
  let confirm_password = req.body.confirm_password;

  

  if(typeof first_name == 'undefined' || first_name == ''){
    return res.status(400).json({"statusCode":"400", "errmsg":"First name is required"});
  }
  if(typeof last_name == 'undefined' || last_name == ''){
    return res.status(400).json({"statusCode":"400", "errmsg":"Last name is required"});
  }
  if(typeof email_address == 'undefined' || email_address == ''){
    return res.status(400).json({"statusCode":"400", "errmsg":"Please provide valid email address"});
  }
  if(typeof password == 'undefined' || password == ''){
    return res.status(400).json({"statusCode":"400", "errmsg":"Please provide valid password"});
  }
  if(email_address != confirm_email_address){
    return res.status(400).json({"statusCode":"400", "errmsg":"Email address and confirm email should be same"});
  }
  if(password != confirm_password){
    return res.status(400).json({"statusCode":"400", "errmsg":"Password and confirm password should be same"});
  }
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if(!emailRegexp.test(email_address)){
    return res.status(400).json({"statusCode":"400", "errmsg":"Please provide valid email address"});
  }
  
  let Resp = User.addUser(first_name, last_name, email_address, password);

  return res.status(200).json({"status":200, "msg":"User registered successfully"});
};
