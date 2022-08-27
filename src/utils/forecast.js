import axios from 'axios'

function getWeather(coordinates) {
    const weatherStackUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_KEY}&query=${coordinates}`

    return axios.get(weatherStackUrl, { responseType: 'json' })
}

async function getWeatherAsync(coordinates) {
    const weatherStackUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_KEY}&query=${coordinates}`

    return await axios.get(weatherStackUrl, { responseType: 'json' })
}

export { getWeather, getWeatherAsync }