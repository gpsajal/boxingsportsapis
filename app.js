const path = require("path");

const express = require("express");

const app = express();

const moment = require('moment'); 

require('dotenv').config();

const port = process.env.PORT || 5050;

console.log("Custom PORT", process.env.PORT);

const bodyParser = require('body-parser');

const userRoutes = require("./routes/user");

const errorController = require("./controllers/404");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

app.use('/users', userRoutes);

// app.set('view engine', 'ejs');

// app.set('views', 'views');

// app.use(staticRoutes);

// app.use(errorController.get404);

app.listen(port, (req, res)=>{
    console.log(`Node server listening on ${port}`,moment().format('YYYY-MM-DD HH:mm:ss'));
});