// jshint esversion: 6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const http = require("https");
const app = express();
// Declaring the ipAddress
let ipAddress = "";
// Init body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
// setting up ejs
app.set('view engine', 'ejs');
// instructing to serve static files from "public"
app.use(express.static("public"));
// listen at port 3000
app.listen(3000, () => {
    console.log("Death star ready at port: 3000");
});
// actions for get at home route
app.get("/", (req, res) => {
    // making url for request to api server
    const api_key = process.env.API_KEY;
    const api_url = 'https://geo.ipify.org/api/v1?';
    let url = "";
    if (ipAddress === "") {
        url += api_url + 'apiKey=' + api_key;
    } else {
        url += api_url + 'apiKey=' + api_key + '&ipAddress=' + ipAddress;
    }
    // requesting info from url
    http.get(url, (response) => {
        // logging status code
        console.log(response.statusCode);
        // retriving data
        response.on("data", (data) => {
            const ipAddressInfo = JSON.parse(data);
            // console.log(ipAddressInfo);
            const ip = ipAddressInfo.ip;
            const city = ipAddressInfo.location.city;
            const region = ipAddressInfo.location.region;
            const country = ipAddressInfo.location.country;
            const location = city + ", " + region + ", " + country;
            const timezone = ipAddressInfo.location.timezone;
            const isp = ipAddressInfo.isp;
            const cordinates = {
                lat: ipAddressInfo.location.lat,
                lng: ipAddressInfo.location.lng
            };
            // init object to send to home.ejs
            const ipInfo = {
                ip: ip,
                location: location,
                timezone: timezone,
                isp: isp,
                cordinates: cordinates
            };
            // render home.ejs
            res.render("home.ejs", {
                ipInfo: ipInfo
            });
        });
    });
});
// action for post at home route
app.post("/", (req, res) => {
    // init ip Address
    ipAddress = req.body.ipEntered;
    if(ipAddress === ""){
        res.render("failure");
    }
    else{
        res.redirect("/");
    }
});
// action for post >> failure
app.post("/failure", (req,res)=>{
    res.redirect("/");
});