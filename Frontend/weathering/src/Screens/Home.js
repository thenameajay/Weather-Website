import { useState } from "react"


function Home(){
    const [weather_data, setdata]=useState()

    function getWeather(lon,lat){

        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=0a632f7c0ee705cdce05e73286e0149e").then((res)=>res.json()).then((result)=>{

            setdata(result)
            console.log(weather_data)
        })
    }


    return(
        <>
            <div>
                <label>Longitude</label>
                <input id="lon" type="text" />
                <label>Latitude</label>
                <input id="lat" type="text" />
                <button id="submit-btn" onClick={()=>getWeather(document.getElementById('lon').value, document.getElementById('lat').value)} type="submit">Get Weather</button>
            </div>

            <div>

            </div>
        </>
    )
}

export default Home