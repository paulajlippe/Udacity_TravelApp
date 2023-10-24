# UdacityTravelApp
 Udacity Capstone Project - Travel App

## This project is part of the Udacity's Nanodegree in FrontEnd Web Development.

This project requires you to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs. 

The project will include a simple form where you enter the location you are traveling to and the date you are leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast. The OpenWeather API is fantastic but it doesn’t let you get future data for free and it’s not that flexible with what information you enter; we are going to use the Weatherbit API for you to see how another API accomplishes the same goals. Weatherbit API has one problem, it only takes in coordinates for weather data -- it’s that specific. So, we’ll need to get those coordinates from the Geonames API. Once we have all of this data, we’ll want to display an image of the location entered; for this, we will be using the Pixabay API.

## The app runs with the commands:

### Terminal 1:

1: `npm i` </br>
2: `npm run build-prod` </br>
3: `npm run start` </br>

### Terminal 2:

1: `npm run build-dev`

## The loaders and plugins used are: 
Babel/core - /preset-env, loader, Cors Express, dotenv, express, Style-loader - node-sass css-loader sass-loader, jest, python2, clean-webpack-plugin, html-webpack-plugin, mini-css-extract-plugin, optimize-css-assets-webpack-plugin, terser-webpack-plugin, workbox-weback-plugin

## APIs utilized are:
Weatherbit API - https://www.weatherbit.io/ 
Geonames API - http://www.geonames.org/ 
Pixabay API - https://pixabay.com/ 

## Testing:
There are two basic JEST tests included.