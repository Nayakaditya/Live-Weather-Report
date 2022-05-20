const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');
const { response } = require('express');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {
    const cityName = req.body.cityname;
    const apiKey = '6bffcc039540fd0ca8c3a3a002896ae9';
    const unit = "metric";
    const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid="+apiKey+"&units="+ unit+ "";

    https.get(weatherURL, function(response){
        console.log(response.statusCode)
        response.on('data', (d)=>{

            const data = JSON.parse(d);
            const temprature = data.main.temp; 
            const description = data.weather[0].description;

            res.write("<h1>The temprature of " + cityName + " is " +  temprature + " degree Celcius</h1>");
            res.write("<h3>and weather condition is " + description+"</h3>");
            res.send();
        })
    });

    console.log("Post request recieved!");
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log(`Server running on PORT ${port} http://localhost:${port}`);
});