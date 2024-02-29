import "../Styles/More.css"
import { useNavigate } from "react-router-dom"

function More(){
    const navigate=useNavigate()

    return (
        <>
            <div id="outer-div-more">
                <button class="options-btn" onClick={()=>navigate('/more/weather-forecast',{state : {choice : "today"}})}>Search Weather By City Name</button>
                <button class="options-btn" onClick={()=>navigate('/more/weather-forecast',{state : {choice : "future"}})}>Weather Forecast</button>
                <button class="options-btn" onClick={()=>navigate('/more/weather-history')}>Weather History</button>
            </div>
        </>
    )
}

export default More