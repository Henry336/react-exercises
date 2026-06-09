import Image from './Image'

const Weather = ({ weather }) => {
    const icon = weather.weather[0].icon
    const alt = weather.weather[0].description
    const url = `https://openweathermap.org/img/wn/${icon}@2x.png`
    return (
        <div>
            <p>Temperature {weather.main.temp}°C</p>
            <Image url={url} alt={alt}/>
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather