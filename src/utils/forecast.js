const request = require('request');
require('dotenv').config();

//
// Goal: Add new data to forecast
//
// 1. Update the forecast string to include new data
// 2. Commit your changes
// 3. Push your changes to GitHub and deploy to Heroku
// 4. Test your work in the live application

const forecast = (lat, lng, callback) => {

    const url = 'https://api.darksky.net/forecast/'+process.env.DARKSKY_APIKEY+'/'+ lat + ',' + lng + '?units=si&lang=ko';

    request({ url, json: true}, 'GET', (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined,
                body.daily.data[0].summary + '. It is currently '+body.currently.temperature+' degrees out. The high today is ' + body.daily.data[0].temperatureHigh +' with a low is ' + body.daily.data[0].temperatureLow + '. There is a '+body.currently.precipProbability+'% of rain.');
        }
    });
};

module.exports = { forecast: forecast };
