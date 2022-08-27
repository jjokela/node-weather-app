console.log('Hello from index.js!')

async function fetchData(location) {
    let weatherResponse = await fetch(`/weather?address=${location}`)
    let responseJson = await weatherResponse.json()

    var res = document.getElementById("result");
    var err = document.getElementById("error");
    var loc = document.getElementById("location");
    var forecast = document.getElementById("forecast");
    var errorInput = document.getElementById("errorInput");

    if (responseJson.error) {
        console.log(responseJson.error)
        res.style.display = "none";
        err.style.display = "block";

        loc.innerHTML = ''
        forecast.innerHTML = ''
        errorInput = responseJson.error
    } else {
        console.log(responseJson)
        err.style.display = "none";
        res.style.display = "block";

        loc.innerHTML = responseJson.location
        forecast.innerHTML = responseJson.forecast
        errorInput = ''
    }
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(search.value)
    fetchData(search.value)
})
