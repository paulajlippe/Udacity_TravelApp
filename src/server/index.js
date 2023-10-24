// Setup empty JS object to act as endpoint for all routes
let plannerData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
require('dotenv').config();
const fetch=require('node-fetch');

const axios = require('axios');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
})

/* Spin up the server*/
// Setup Server
const port = 3010; 
app.listen(port, ()=> {
  console.log("App listening on port 3010!");
});

//API Variables 
////Geonames Webservices 
const geoUrl = ' http://api.geonames.org/searchJSON?q=';
const geoApi = `&maxRows=1&username=${process.env.GEONAME_USER}`;

////Weatherbit - 16 Day Weather Forecast API
const wBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const wBitApi = `&key=${process.env.Weather_API}`;

////Pixabay API 
const pixabayUrl = `https://pixabay.com/api/?key=${process.env.PIXABAY}`;



// POSTS routes
app.post('/newTrip', (req, res)=>{
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

//GET 

////Geonames 
app.get('/geoNames', async(req, res) =>{
 
  let newPlace = plannerData.location;
  console.log(`Server Side: ${newPlace}`);
  const geoNamesUrl = `${geoUrl}${newPlace}${geoApi}`;
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
////WheatherBit GET
app.get('/weatherBit', async(req, res) =>{
  console.log('WeatherBit:');  
  const wUrl = `${wBitUrl}lat=${plannerData.lat}&lon=${plannerData.long}${wBitApi}`;

  console.log(`WeatherBit url is ${wUrl}`);  
  fetch(wUrl).then(res => res.json()).then(resonse =>{
  let weatherDay = plannerData.untilTrip;
  console.log(`Weatherday`, weatherDay);
  const data = resonse.data[weatherDay];
  console.log(`Data from WeatherBit`, data);
    try {
      
      plannerData['maxTemp'] = data.max_temp;
      plannerData['minTemp'] = data.low_temp;
      plannerData['description'] = data.weather.description;
      console.log('Planner data after WeatherBit: ',plannerData);
      res.send(data);
      
    }catch (e) {
      console.log("Error: ", e);
    }
  })

})

////Pixabay GET
app.get('/pixabay', async(req, res) =>{
  const pBUrl = `${pixabayUrl}&q=${plannerData.city}&image_type=photo`;
  console.log('The pixabay url: ', pBUrl);
  fetch(pBUrl).then(res => res.json()).then(data =>{
   
    
    try {
      plannerData['imageURL'] = data.hits[0].webformatURL;
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