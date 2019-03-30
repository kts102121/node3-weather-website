const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.set('x-powered-by', false);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ron Kim'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ron Kim'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ron Kim',
        helpText: 'I will help you!'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.status(400).send({
            error: 'You must provide an address'
        });
    }

    geocode.geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error});
        }

        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.status(400).send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        name: 'Ron Kim',
        errorMessage: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        name: 'Ron Kim',
        errorMessage: 'Page Not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});
