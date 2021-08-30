// jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
app.use(bodyParser.urlencoded({extended : true }));
app.set('view engine' , 'ejs');
app.use(express.static("public"));
app.listen(3000 , ()=>{
    console.log("Death star ready at port: 3000");
});

app.get("/" , (req, res)=>{
    res.render(__dirname + "/views/home.ejs");
});
