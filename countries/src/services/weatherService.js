import axios from 'axios'

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q="
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (capital, shortForm) => {
    const url = `${baseUrl + capital},${shortForm}&APPID=${apiKey}&units=metric` 
    return axios
        .get(url)
        .then(response => response.data)
}


export default { getWeather }