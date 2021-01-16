const fs = require('fs');
const path = require('path');
const db = require('../utils/database');

var moment = require('moment'); 

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

module.exports = class User {
  constructor(first_name, last_name, email_address, password) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email_address = email_address;
    this.password = password;
  }

  static addUser(fname, lname, email, pass) {
    return db.execute("INSERT INTO users (first_name, last_name, email_address, password, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?)", [fname, lname, email, pass, moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')]);
  }


  static fetchAll() {    
    return db.execute("SELECT * FROM users");
  }

  static findUserByEmail(email) {
   return db.execute("SELECT * FROM users WHERE email_address = ? LIMIT 1", [email]);
  }

  static findUserByEmailPass(email, pass) {
    return db.execute("SELECT * FROM users WHERE email_address = ? AND password = ? LIMIT 1", [email, pass]);
  }

};
