// jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended : true }));

app.listen(3000 , ()=>{
    console.log("Death star ready at port: 3000");
});

app.get("/" , (req, res)=>{
    res.sendFile(__dirname + "/views/index.html");
});
