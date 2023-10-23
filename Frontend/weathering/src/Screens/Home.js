import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"


function Home() {
    const [weather_data, setdata] = useState()
    // const [city, setcity] = useState("")
    const [lat, setlat] = useState()
    const [lon, setlon] = useState()

    navigator.geolocation.getCurrentPosition((position) => {
        setlat(position.coords.latitude)
        setlon(position.coords.longitude)
    })


    function getWeather() {
        // BELOW IS ANOTHER API AVAILABLE FOR WEATHER WHICH ONLY NEEDS CITY NAME AND IN RETURN, GIVES US FORECAST PLUS HISTORICAL WEATHER ETC
        // fetch(`http://api.weatherstack.com/current?access_key=cf4a8edf5f9d4b70b6c588c25dfc8203&query=${city}`).then((res)=>res.json()).then((result)=>{

        //         console.log("in fetch 1")
        //        setdata(result)
        //        console.log(weather_data);
        //     }) 

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0a632f7c0ee705cdce05e73286e0149e`).then((res) => res.json()).then((result) => {
            setdata(result)
            console.log(result)
        })
    }



    return (
        <>
            <div id="top-container">
                <button id="sign-up-btn">Sign Up</button>
                <h2>Sign Up here to get Weather report each day</h2>
            </div>

            <div id="mid-container">
                <div>
                    <label class="heading">Temperature </label>
                    <label>{weather_data == undefined ? '' : weather_data.main.temp}</label>
                </div>
                <div>
                    <label class="heading">Feels Like </label>
                    <label>{weather_data == undefined ? '' : weather_data.main.feels_like}</label>
                </div>
                <div>
                    <label class="heading">Humidity </label>
                    <label>{weather_data == undefined ? '' : weather_data.main.humidity}</label>
                </div>
                <div>
                    <label class="heading">Pressure </label>
                    <label>{weather_data == undefined ? '' : weather_data.main.pressure}</label>
                </div>
                <div>
                    <label class="heading">Weather </label>
                    <label>{weather_data == undefined ? '' : weather_data.weather.discription}</label>
                </div>
                <div>
                    <label class="heading">Wind </label>
                    <label>{weather_data == undefined ? '' : `${weather_data.wind.speed} in ${weather_data.wind.deg} Deg`}</label>
                </div>
                <div>
                    <label class="heading">Visiblity </label>
                    <label>{weather_data == undefined ? '' : weather_data.visibility}</label>
                </div>
                <div>
                    <label class="heading">Sunrise </label>
                    <label>{weather_data == undefined ? '' : Date(weather_data.sys.sunrise)}</label>
                </div>
                <div>
                    <label class="heading">Sunset </label>
                    <label>{weather_data == undefined ? '' : Date(weather_data.sys.sunset)}</label>
                </div>

                <button id="submit-btn" onClick={() => getWeather()} type="submit">Get Weather</button>
            </div>

            <div>

            </div>
        </>
    )
}

export default Home

// THE USESTATE IS LAGGING ONE STEP WITH CONSOLE LOG, BUT IT IS FOUND THAT IT WORKS OK WITH THE HTML WRITTEN IN THE RETURN FUNCTION