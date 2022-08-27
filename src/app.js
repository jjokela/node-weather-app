import express from 'express'
// ES needs this
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs'

import { getWeatherAsync } from './utils/forecast.js'
import { geocodeAsync } from './utils/geocode.js'
import dotenv from 'dotenv'
dotenv.config()

// works only in require()
//console.log(__dirname)
//console.log(__filename)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// now this works with ES
console.log(__dirname)
console.log(__filename)

const pathToPublic = path.join(__dirname, '../public')
console.log(`Path to public: ${pathToPublic}`)

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static('public'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Isi-3000'
    })
})

app.get('/weather', async (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    let location = ''
    let forecast = ''

    try {
        let geocodeResult = await geocodeAsync(req.query.address)
        let features = geocodeResult.data.features[0]
        location = features.place_name
        console.log(`Place: ${location}, Coordinates: ${features.center.join()}`)

        let coords = `${features.center[1]},${features.center[0]}`

        let weatherResult = await getWeatherAsync(coords)
        if (weatherResult.data.error) {
            console.log(weatherResult.data.error)
            throw {
                message: weatherResult.data.error
            }
        } else {
            let current = weatherResult.data.current
            forecast = `Weather now is ${current.weather_descriptions.join()}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`
            console.log(forecast)
        }
    } catch (error) {
        console.log(error.message)
        return res.send({
            error: error.message
        })
    }

    const result = {
        address: req.query.address,
        location: location,
        forecast: forecast
    }

    res.send(result)
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Isi-3000'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Need elp? Got yelp!',
        name: 'Isi-3000'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found :('
    })
})

app.listen(port, () => {
    console.log(`Express server running on port ${port}`)
})

