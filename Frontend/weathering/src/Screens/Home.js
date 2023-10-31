import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../Styles/Home.css"
import humidity from "../Images/humidity.png"
import pressure from "../Images/pressure.png"
import temperature from "../Images/temperature.png"
import thunderstorm from "../Images/thunderstorm.png"
import visibility from "../Images/visibility.png"
import wind from "../Images/wind.png"

function Home() {
    const navigate = useNavigate()

    const [weather_data, setdata] = useState()
    const [city, setcity] = useState("Jaipur")
    const [lat, setlat] = useState()
    const [lon, setlon] = useState()

    navigator.geolocation.getCurrentPosition((position) => {
        setlat(position.coords.latitude)
        setlon(position.coords.longitude)
    })

    function signUp() {
        navigate('/register')
    }

    function getWeather() {
        // BELOW IS ANOTHER API AVAILABLE FOR WEATHER WHICH ONLY NEEDS CITY NAME AND IN RETURN, GIVES US FORECAST PLUS HISTORICAL WEATHER ETC
        // fetch(`http://api.weatherstack.com/current?access_key=cf4a8edf5f9d4b70b6c588c25dfc8203&query=${city}`).then((res)=>res.json()).then((result)=>{

        //         console.log("in fetch 1")
        //     //    setdata(result)
        //        console.log(result);
        //     }) 

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0a632f7c0ee705cdce05e73286e0149e`).then((res) => res.json()).then((result) => {
            setdata(result)
            console.log(result)
        })
    }



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
                            <label class="data">{weather_data == undefined ? '' : weather_data.main.temp} K</label>
                        </div>
                    </div>
                    <div class="subContainer">
                        <img class="weather-img" src={temperature} />
                        <div class="minor-container">
                            <label class="heading">Feels Like </label>
                            <label class="data">{weather_data == undefined ? '' : weather_data.main.feels_like} K</label>
                        </div>
                    </div>
                    <div class="subContainer">
                        <img class="weather-img" src={humidity} />
                        <div class="minor-container">
                            <label class="heading">Humidity </label>
                            <label class="data">{weather_data == undefined ? '' : weather_data.main.humidity}</label>
                        </div>
                    </div>
                    <div class="subContainer">
                        <img class="weather-img" src={pressure} />
                        <div class="minor-container">
                            <label class="heading">Pressure </label>
                            <label class="data">{weather_data == undefined ? '' : weather_data.main.pressure}</label>
                        </div>
                    </div>
                    <div class="subContainer">
                        <img class="weather-img" src={thunderstorm} />
                        <div class="minor-container">
                            <label class="heading">Weather </label>
                            <label class="data">{weather_data == undefined ? '' : weather_data.weather.discription}</label>
                        </div>
                    </div>
                    <div class="subContainer">
                        <img class="weather-img" src={wind} />
                        <div class="minor-container">
                            <label class="heading">Wind </label>
                            <label class="data">{weather_data == undefined ? '' : `${weather_data.wind.speed} m/s in ${weather_data.wind.deg} Deg`}</label>
                        </div>
                    </div>
                    <div class="subContainer">
                        <img class="weather-img" src={visibility} />
                        <div class="minor-container">
                            <label class="heading">Visiblity </label>
                            <label class="data">{weather_data == undefined ? '' : weather_data.visibility}</label>
                        </div>
                    </div>
                    <div class="subContainer">
                        <img class="weather-img" src="" />
                        <div class="minor-container">
                            <label class="heading">Sunrise </label>
                            <label class="data">{weather_data == undefined ? '' : Date(weather_data.sys.sunrise)}</label>
                        </div>
                    </div>
                    <div class="subContainer">
                        <img class="weather-img" src="" />
                        <div class="minor-container">
                            <label class="heading">Sunset </label>
                            <label class="data">{weather_data == undefined ? '' : Date(weather_data.sys.sunset)}</label>
                        </div>
                    </div>

                    <button id="submit-btn" onClick={() => getWeather()} type="submit">Get Weather</button>
                </div>
            </div>
        </>
    )
}

export default Home

// THE USESTATE IS LAGGING ONE STEP WITH CONSOLE LOG, BUT IT IS FOUND THAT IT WORKS OK WITH THE HTML WRITTEN IN THE RETURN FUNCTION