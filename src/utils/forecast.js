const request = require('request');
require('dotenv').config();

const forecast = (lat, lng, callback) => {

    const url = 'https://api.darksky.net/forecast/'+process.env.DARKSKY_APIKEY+'/'+ lat + ',' + lng + '?units=si&lang=ko';

    request({ url, json: true}, 'GET', (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined,
                body.daily.data[0].summary + '. It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'% of rain.');
        }
    });
};

module.exports = { forecast: forecast };
