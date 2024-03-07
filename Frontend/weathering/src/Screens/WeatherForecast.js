import { useEffect, useState } from "react"
import "../Styles/WeatherForecast.css"
import temperature from "../Images/temperature1.png"
import sun from "../Images/sunny.png"
import loc2 from "../Images/location2.png"
import earth from "../Images/earth.png"
import datetime from "../Images/datetime.png"
import wind from "../Images/wind.png"
import { useLocation } from "react-router-dom"

function WeatherForecast() {
    const [userChoice, setChoice] = useState(useLocation())
    const [city, setcity] = useState()
    const [forecastData, setForecastData] = useState()
    const [dates, setDates] = useState()
    const [date, setDate] = useState()
    const [specificData, setSpecificData] = useState()
    const [indexValue, setindex] = useState()

    useEffect(()=>{
        if(city==undefined){
            return
        }

        let slashIndx=city.indexOf("/")
        let trueCity=city.slice(0,slashIndx).trim()
        let trueState=city.slice(slashIndx+1,city.length).toLowerCase().trim()

        fetch(`https://api.api-ninjas.com/v1/geocoding?city=${trueCity}`,{
            method: "GET",
            headers: {"X-Api-Key": process.env.REACT_APP_API_NINJAS}
        }).then((r1) => {
           return r1.json()
        }).then((res)=>{
            let trueIndex
            if(res[0]!=undefined){

                for(let i=0;i<res.length;i++){
                    if(res[i].state.toLowerCase()==trueState){
                        trueIndex=i
                        break
                    }
                }
                
                getForecast(res[trueIndex].latitude, res[trueIndex].longitude)
            }
        })
    },[city])

    function getForecast(lt,ln) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lt}&lon=${ln}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_ID}`).then((res) => res.json()).then((result) => {
            setForecastData(result)

            let tempDate = ["", "", "", "", "", ""]
            let temp = ""
            let count = 0

            for (let i = 0; i < 40; i++) {
                if (result.list[i].dt_txt.slice(0, 10) != temp) {
                    temp = result.list[i].dt_txt.slice(0, 10)
                    tempDate[count] = temp
                    count++
                }
            }

            setDates(tempDate)

            if (userChoice.state.choice == "today") {
                document.getElementById("outer-div-forecast").style.display = "flex"
                document.getElementById("fourth-sec-forecast").style.display = "flex"
            }
        })

    }

    function showDetailedForecast(index) {
        document.getElementById("third-sec-forecast").style.display = "none"
        document.getElementById("fourth-sec-forecast").style.display = "flex"
        setindex(index)
    }

    function back() {
        const p1 = document.getElementById("second-sec-forecast")
        const p2 = document.getElementById("third-sec-forecast")
        const p3 = document.getElementById("fourth-sec-forecast")

        if (p3.style.display == "flex") {
            p3.style.display = "none"
            p2.style.display = "flex"
        }
        else if (p2.style.display == "flex") {
            p2.style.display = "none"
            p1.style.display = "flex"
        }
    }

    function specificForecast(specificDate) {
        setDate(specificDate)

        const temp = []
        for (let i = 0; i < 40; i++) {
            if (forecastData.list[i].dt_txt.slice(0, 10) == specificDate) {
                temp.push(<button class="forecast-date" onClick={() => showDetailedForecast(i)}>{forecastData.list[i].dt_txt}</button>)
            }
        }
        setSpecificData(temp)
        document.getElementById("second-sec-forecast").style.display = "none"
        document.getElementById("third-sec-forecast").style.display = "flex"
    }

    if (userChoice.state.choice == "future") {
        return (
            <>
                <div id="outer-div-forecast">
                    <div id="first-sec-forecast">
                        <button id="back-btn-forecast" onClick={() => back()}>&larr;</button>
                        <input id="search-forecast" type="search" placeholder="i.e. jaipur/rajasthan" />
                        <button id="search-btn" onClick={() => setcity(document.getElementById("search-forecast").value)}>get</button>
                    </div>

                    <div id="second-sec-forecast" style={{ display: dates == undefined ? "none" : "flex" }}>
                        <button class="forecast-date" onClick={() => specificForecast(dates[0])}>
                            {dates == undefined ? '' : dates[0]}
                        </button>
                        <button class="forecast-date" onClick={() => specificForecast(dates[1])}>
                            {dates == undefined ? '' : dates[1]}
                        </button>
                        <button class="forecast-date" onClick={() => specificForecast(dates[2])}>
                            {dates == undefined ? '' : dates[2]}
                        </button>
                        <button class="forecast-date" onClick={() => specificForecast(dates[3])}>
                            {dates == undefined ? '' : dates[3]}
                        </button>
                        <button class="forecast-date" onClick={() => specificForecast(dates[4])}>
                            {dates == undefined ? '' : dates[4]}
                        </button>
                        <button class="forecast-date" onClick={() => specificForecast(dates[5])}>
                            {dates == undefined ? '' : dates[5]}
                        </button>
                    </div>

                    <div id="third-sec-forecast" style={{ display: specificData == undefined ? "none" : "flex" }}>
                        {specificData}
                    </div>

                    <div id="fourth-sec-forecast">
                        <label id="forecast-description">{forecastData == undefined || indexValue == undefined ? '' : forecastData.list[indexValue].weather[0].description}</label>
                        <div class="forecastSubContainer">
                            <img class="forecast-weather-img" src={datetime} />
                            <div class="forecast-minor-container">
                                <label class="forecast-heading">Date & Time </label>
                                <hr />
                                <div class="forecast-data-container">
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Date : ' + forecastData.list[indexValue].dt_txt.slice(0, 10)}</label>
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Time : ' + forecastData.list[indexValue].dt_txt.slice(11, 19)}</label>
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Time Zone : ' + String(new Date(forecastData.list[indexValue].dt)).slice(35, 54)}</label>
                                </div>
                            </div>
                        </div>
                        <div class="forecastSubContainer">
                            <img class="forecast-weather-img" src={temperature} />
                            <div class="forecast-minor-container">
                                <label class="forecast-heading">Temperature </label>
                                <hr />
                                <div class="forecast-data-container">
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Feels Like : ' + String(forecastData.list[indexValue].main.feels_like - 273.15).slice(0, 5)}&deg;C</label>
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Maximum : ' + String(forecastData.list[indexValue].main.temp_max - 273.15).slice(0, 5)}&deg;C</label>
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Minimum : ' + String(forecastData.list[indexValue].main.temp_min - 273.15).slice(0, 5)}&deg;C</label>
                                </div>
                            </div>
                        </div>
                        <div class="forecastSubContainer">
                            <img class="forecast-weather-img" src={wind} />
                            <div class="forecast-minor-container">
                                <label class="forecast-heading">Wind </label>
                                <hr />
                                <div class="forecast-data-container">
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Direction : ' + forecastData.list[indexValue].wind.deg}&deg;</label>
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Speed : ' + forecastData.list[indexValue].wind.speed + ' m/s'}</label>
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Gust : ' + forecastData.list[indexValue].wind.gust}</label>
                                </div>
                            </div>
                        </div>
                        <div class="forecastSubContainer">
                            <img class="forecast-weather-img" src={earth} />
                            <div class="forecast-minor-container">
                                <label class="forecast-heading">Atmosphere </label>
                                <hr />
                                <div class="forecast-data-container">
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Pressure : ' + forecastData.list[indexValue].main.humidity + ' hPa'}</label>
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Humidity : ' + forecastData.list[indexValue].main.pressure + ' %'}</label>
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Clouds : ' + forecastData.list[indexValue].clouds.all}</label>
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Visiblity : ' + forecastData.list[indexValue].visibility}</label>
                                </div>
                            </div>
                        </div>
                        <div class="forecastSubContainer">
                            <img class="forecast-weather-img" src={loc2} />
                            <div class="forecast-minor-container">
                                <label class="forecast-heading">Location </label>
                                <hr />
                                <div class="forecast-data-container">
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'City Name : ' + forecastData.city.name}</label>
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Latitude : ' + forecastData.city.coord.lat}</label>
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Longitude : ' + forecastData.city.coord.lon}</label>
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Country : ' + forecastData.city.country}</label>
                                </div>
                            </div>
                        </div>
                        <div class="forecastSubContainer">
                            <img class="forecast-weather-img" src={sun} />
                            <div class="forecast-minor-container">
                                <label class="forecast-heading">Sun </label>
                                <hr />
                                <div class="forecast-data-container">
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Sunrise : ' + String(new Date(forecastData.city.sunrise * 1000)).slice(16, 25)}</label>
                                    <label class="forecast-data">{forecastData == undefined || indexValue == undefined ? '' : 'Sunset : ' + String(new Date(forecastData.city.sunset * 1000)).slice(16, 25)}</label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }

    else if (userChoice.state.choice == "today") {
        return (
            <>
                <div id="outer-div-forecast">
                    <div id="first-sec-forecast">
                        <input id="search-forecast" type="search" placeholder="i.e. jaipur/rajasthan" />
                        <button id="search-btn" onClick={() => setcity(document.getElementById("search-forecast").value)}>get</button>
                    </div>

                    <div id="fourth-sec-forecast">
                        <label id="forecast-description">{forecastData == undefined ? '' : forecastData.list[0].weather[0].description}</label>
                        <div class="forecastSubContainer">
                            <img class="forecast-weather-img" src={datetime} />
                            <div class="forecast-minor-container">
                                <label class="forecast-heading">Date & Time </label>
                                <hr />
                                <div class="forecast-data-container">
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Date : ' + forecastData.list[0].dt_txt.slice(0, 10)}</label>
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Time : ' + forecastData.list[0].dt_txt.slice(11, 19)}</label>
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Time Zone : ' + String(new Date(forecastData.list[0].dt)).slice(35, 54)}</label>
                                </div>
                            </div>
                        </div>
                        <div class="forecastSubContainer">
                            <img class="forecast-weather-img" src={temperature} />
                            <div class="forecast-minor-container">
                                <label class="forecast-heading">Temperature </label>
                                <hr />
                                <div class="forecast-data-container">
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Feels Like : ' + String(forecastData.list[0].main.feels_like - 273.15).slice(0, 5)}&deg;C</label>
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Maximum : ' + String(forecastData.list[0].main.temp_max - 273.15).slice(0, 5)}&deg;C</label>
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Minimum : ' + String(forecastData.list[0].main.temp_min - 273.15).slice(0, 5)}&deg;C</label>
                                </div>
                            </div>
                        </div>
                        <div class="forecastSubContainer">
                            <img class="forecast-weather-img" src={wind} />
                            <div class="forecast-minor-container">
                                <label class="forecast-heading">Wind </label>
                                <hr />
                                <div class="forecast-data-container">
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Direction : ' + forecastData.list[0].wind.deg}&deg;</label>
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Speed : ' + forecastData.list[0].wind.speed + ' m/s'}</label>
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Gust : ' + forecastData.list[0].wind.gust}</label>
                                </div>
                            </div>
                        </div>
                        <div class="forecastSubContainer">
                            <img class="forecast-weather-img" src={earth} />
                            <div class="forecast-minor-container">
                                <label class="forecast-heading">Atmosphere </label>
                                <hr />
                                <div class="forecast-data-container">
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Pressure : ' + forecastData.list[0].main.humidity + ' %'}</label>
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Humidity : ' + forecastData.list[0].main.pressure + ' hPa'}</label>
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Clouds : ' + forecastData.list[0].clouds.all}</label>
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Visiblity : ' + forecastData.list[0].visibility}</label>
                                </div>
                            </div>
                        </div>
                        <div class="forecastSubContainer">
                            <img class="forecast-weather-img" src={loc2} />
                            <div class="forecast-minor-container">
                                <label class="forecast-heading">Location </label>
                                <hr />
                                <div class="forecast-data-container">
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'City Name : ' + forecastData.city.name}</label>
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Latitude : ' + forecastData.city.coord.lat}</label>
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Longitude : ' + forecastData.city.coord.lon}</label>
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Country : ' + forecastData.city.country}</label>
                                </div>
                            </div>
                        </div>
                        <div class="forecastSubContainer">
                            <img class="forecast-weather-img" src={sun} />
                            <div class="forecast-minor-container">
                                <label class="forecast-heading">Sun </label>
                                <hr />
                                <div class="forecast-data-container">
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Sunrise : ' + String(new Date(forecastData.city.sunrise * 1000)).slice(16, 25)}</label>
                                    <label class="forecast-data">{forecastData == undefined ? '' : 'Sunset : ' + String(new Date(forecastData.city.sunset * 1000)).slice(16, 25)}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default WeatherForecast