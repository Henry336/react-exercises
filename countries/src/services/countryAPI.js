import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"
const allUrl = baseUrl + "all"
const singleUrl = baseUrl + "name/" // should be /api/name/{name} where {name} is the country name

const getAll = () => {
    console.log("Retrieving countries...")
    return axios.get(allUrl).then(response => response.data)
}

export default { getAll }