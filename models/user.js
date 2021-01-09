const fs = require('fs');
const path = require('path');
const db = require('../utils/database');
const Cart = require('./cart');

var moment = require('moment'); 

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

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


  save() {
    return db.execute("INSERT INTO users (first_name, last_name, email_address, password, created_at, updated_at) VALUES(?, ?, ?, ?)", [this.first_name, this.last_name, this.email_address, this.password, moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')]);
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll() {    
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
   return db.execute("SELECT * FROM products WHERE id = ? ", [id]);
  }
};
