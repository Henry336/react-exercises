import { useState, useEffect } from 'react'
import Header from './Header'
import Languages from './Languages'
import Image from './Image'
import Weather from './Weather'
import weatherService from '../services/weatherService'
import SingleCountry from './SingleCountry'

const Countries = ({ countries, handleShow }) => {
    let show = ""
    const len = countries.length
    const [weather, setWeather] = useState(null)

    if (len >= 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (len > 1) {
        return (
            <div>
                {countries.map(c => (
                    <li key={c.name.common}>
                        {c.name.common} 
                        <button onClick={() => handleShow(c.name.common)}>
                            Show
                        </button>
                    </li>
                ))}
            </div>
        )
    } else if (len === 0) {
        return (
            <div>
                No countries match the keywords
            </div>
        )
    }

    // otherwise, only 1 country needs to be rendered
    const country = countries[0]

    return (
        <div>
            <SingleCountry country={country}/>
        </div>
    )
}

export default Countries