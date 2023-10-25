const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

// Setup empty JS object to act as endpoint for all routes
let plannerData = {};

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fetch = require("node-fetch");
const { response } = require('express');

// START
const app = express();
module.exports = app;

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

// SERVER
const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log(`Server is running on localhost: ${port}`);
}
module.exports = server;

// APIS
const GEO_URL = ' http://api.geonames.org/searchJSON?q=';
const GEO_USER = `&maxRows=1&username=${process.env.GEO_USER}`;
const WB_URL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const WB_KEY = `&key=${process.env.WB_KEY}`;
const PIXURL = `https://pixabay.com/api/?key=${process.env.PB_KEY}`;


// POST ROUTES
app.post('/trip', (req, res)=>{
    let userData = req.body;
    let userEntry = {
        location: userData.Location,
        startDate: userData.StartDate,
        endDate: userData.EndDate,
        tripDuration: userData.Duration,
        untilTrip: userData.UntilTrip
    }
    plannerData = userEntry;
    res.send(plannerData);
})

// GET GEONAMES
app.get('/geoNames', async(req, res) => {
    let newPlace = plannerData.location;
    console.log(`Server Side: ${newPlace}`);
    const geoNamesUrl = `${GEO_URL}${newPlace}${GEO_USER}`;
    console.log(`Geonames url is ${geoNamesUrl}`);  
    fetch(geoNamesUrl).then(res => res.json()).then(data =>{
        try {
            res.send(data);
            console.log(`Data from Geoname`, data);
            plannerData['long'] = data.geonames[0].lng;
            plannerData['lat'] = data.geonames[0].lat;
            plannerData['city'] = data.geonames[0].name;
            plannerData['country'] = data.geonames[0].countryName;
            plannerData['code'] = data.geonames[0].countryCode;
            console.log('Planner data after Geonames: ',plannerData);
            }catch (e) {
            console.log("Error: ", e);
        }
    })
})

// GET WEATHERBIT
app.get('/weatherBit', async(req, res) =>{
    const wUrl = `${WB_URL}lat=${plannerData.lat}&lon=${plannerData.long}${WB_KEY}`;
    fetch(wUrl).then(res => res.json()).then(resonse =>{
    let weatherDay = plannerData.untilTrip;
    const data = resonse.data[weatherDay];
        try {
        plannerData['highTemp'] = data.max_temp;
        plannerData['lowTemp'] = data.min_temp;
        plannerData['description'] = data.weather.description;
        console.log('Planner data after WeatherBit: ',plannerData);
        res.send(data);
        } catch (e) {
        console.log("Error: ", e);
        }
    })
})

// GET PIXABAY
app.get('/pixabay', async (req, res) =>{
    const pBUrl = `${PIXURL}&q=${plannerData.city}&image_type=photo`;
    fetch(pBUrl).then(res => res.json()).then(data =>{
        try {
        plannerData['image'] = data.hits[0].webformatURL;
        res.send(data);
        }catch (e) {
        console.log("Error: ", e);
        }
    })
})

// GET route
app.get('/all', sendData);

function sendData (request, response) {
    console.log("Request sent");
    response.send(plannerData);
};

//Export app for test listening 
module.exports = app