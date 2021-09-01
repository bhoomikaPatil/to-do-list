// jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const http = require("https");
const app = express();
let ipAddress = "";
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.listen(3000, () => {
    console.log("Death star ready at port: 3000");
});

app.get("/", (req, res) => {
    const api_key = "at_8NyQVzQfhXktHpx7UsBQ6oQLXyKEH";
    const api_url = 'https://geo.ipify.org/api/v1?';
    let url = "";
    if (ipAddress === "") {
        url += api_url + 'apiKey=' + api_key;
    } else {
        url += api_url + 'apiKey=' + api_key + '&ipAddress=' + ipAddress;
    }
    http.get(url, (response) => {
        console.log(response.statusCode);
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
            const ipInfo = {
                ip: ip,
                location: location,
                timezone: timezone,
                isp: isp,
                cordinates: cordinates
            };
            res.render("home.ejs", {
                ipInfo: ipInfo
            });
        });
    });
});
app.post("/", (req, res) => {
    ipAddress = req.body.ipEntered;
    if(ipAddress === ""){
        res.render("failure");
    }
    else{
        res.redirect("/");
    }
});

app.post("/failure", (req,res)=>{
    res.redirect("/");
});