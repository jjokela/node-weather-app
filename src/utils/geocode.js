import axios from 'axios'

function geocode(location) {
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${process.env.MAPBOX_KEY}`

    return axios.get(mapBoxUrl, { responseType: 'json' })
}

async function geocodeAsync(location) {
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${process.env.MAPBOX_KEY}`

    return await axios.get(mapBoxUrl, { responseType: 'json' })
}

export { geocode, geocodeAsync }