const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const router = require("./routes/pages");
const bodyParser=require('body-parser');
const session=require('express-session');
dotenv.config({path:'./.env'});
const app = express();
const db = mysql.createConnection(
    {
       host:process.env.DATABASE_HOST,
       user:process.env.DATABASE_USER,
       password:process.env.DATABASE_PASSWORD,
       database :process.send.DATABASE 
    }
);
const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.use(bodyParser.json())
app.use(express.urlencoded({ extends:false }));
app.use(session({secret:"zx5yu5quidfgtwvbjasrqbxcz",resave:false,saveUninitialized:false}));
app.set('view engine','hbs');
db.connect((error)=>
{
    if(error)
    {
        console.log(error)
    }else{
        console.log("Connected to database")
    }
})
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));
app.listen(5003,(result, error)=>
{
    if(error)
    {
        console.log('faliuer in connected port')
    }else{
        console.log('App started in port 5003');
    }
})
