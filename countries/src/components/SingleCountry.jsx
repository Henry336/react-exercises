import { useState, useEffect } from 'react'
import weatherService from '../services/weatherService'
import Weather from './Weather'
import Header from './Header'
import Languages from './Languages'
import Image from './Image'

const SingleCountry = ({ country })=> {
    const [weather, setWeather] = useState(null)

    const langs = country.languages // {"fra": "French", "gsw": "Swiss German", ....}
    const languages = Object.values(langs) // array conversion: ["French", "Swiss German",....]

    const c = {
        name: country.name.common,
        shortForm: country.tld[0].slice(1), // to change sth like '.uk' to 'uk' for the weather query
        capital: country.capital,
        area: country.area,
        languages: languages,
        flagUrl: country.flags.png,
        flagAlt: country.flags.alt
    }

    useEffect(() => {
        if (c.capital) {
            weatherService
                .getWeather(c.capital, c.shortForm)
                .then(data => {
                    setWeather(data)
                })
        }
    }, [c.capital, c.shortForm])

    if (!weather) {
        return
    }

    return (
        <div>
            <h1>{c.name}</h1>
            <Header capital={c.capital} area={c.area}/>

            <h1>Languages</h1>
            <Languages langs={c.languages}/>
            <Image url={c.flagUrl} alt={c.flagAlt}/>

            <h1>Weather in {c.capital}</h1>
            <Weather weather={weather}/>
        </div>
    )
}

export default SingleCountry