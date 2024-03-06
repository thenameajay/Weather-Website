import { useEffect, useState } from "react"
import "../Styles/Home.css"
import humidity from "../Images/humidity.png"
import pressure from "../Images/pressure.png"
import temperature from "../Images/temperature1.png"
import feelslike from "../Images/temperature.png"
import thunderstorm from "../Images/thunderstorm.png"
import visibility from "../Images/visibility.png"
import wind from "../Images/wind.png"

function Home() {
    const [weather_data, setdata] = useState()
    const [lat, setlat] = useState()
    const [lon, setlon] = useState()
    const [date, setDate] = useState()


    navigator.geolocation.getCurrentPosition((position) => {
        setlat(position.coords.latitude)
        setlon(position.coords.longitude)
    })

    useEffect(() => {
        if (lat != undefined && lon != undefined) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_ID}`).then((res) => res.json()).then((result) => {
                setdata(result)
                console.log(result)
            })
        }
    }, [lat, lon])

    return (
        <>
            <div id="outer-div">
                <div id="top-container">
                    <h2>Weather Today</h2>
                </div>

                <div id="mid-container">
                    <div class="subContainer">
                        <img class="weather-img" src={temperature} />
                        <div class="minor-container">
                            <label class="heading">Temperature </label>
                            <hr />
                            <label class="data">{weather_data == undefined ? '' : String(weather_data.main.temp-273.15).slice(0,5) } &deg;C</label>
                        </div>
                    </div>
                    <div class="subContainer">
                        <img class="weather-img" src={feelslike} />
                        <div class="minor-container">
                            <label class="heading">Feels Like </label>
                            <hr />
                            <label class="data">{weather_data == undefined ? '' : String(weather_data.main.feels_like-273.15).slice(0,5)} &deg;C</label>
                        </div>
                    </div>
                    <div class="subContainer">
                        <img class="weather-img" src={humidity} />
                        <div class="minor-container">
                            <label class="heading">Humidity </label>
                            <hr />
                            <label class="data">{weather_data == undefined ? '' : weather_data.main.humidity + ' %'}</label>
                        </div>
                    </div>
                    <div class="subContainer">
                        <img class="weather-img" src={pressure} />
                        <div class="minor-container">
                            <label class="heading">Pressure </label>
                            <hr />
                            <label class="data">{weather_data == undefined ? '' : weather_data.main.pressure + ' hPa'}</label>
                        </div>
                    </div>
                    <div class="subContainer">
                        <img class="weather-img" src={thunderstorm} />
                        <div class="minor-container">
                            <label class="heading">Weather </label>
                            <hr />
                            <label class="data">{weather_data == undefined ? '' : weather_data.weather[0].description}</label>
                        </div>
                    </div>
                    <div class="subContainer">
                        <img class="weather-img" src={wind} />
                        <div class="minor-container">
                            <label class="heading">Wind </label>
                            <hr />
                            <label class="data">{weather_data == undefined ? '' : `${weather_data.wind.speed} m/s in ${weather_data.wind.deg} Deg`}</label>
                        </div>
                    </div>
                    <div class="subContainer">
                        <img class="weather-img" src={visibility} />
                        <div class="minor-container">
                            <label class="heading">Visiblity </label>
                            <hr />
                            <label class="data">{weather_data == undefined ? '' : weather_data.visibility + ' m'}</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home

// THE USESTATE IS LAGGING ONE STEP WITH CONSOLE LOG, BUT IT IS FOUND THAT IT WORKS OK WITH THE HTML WRITTEN IN THE RETURN FUNCTION