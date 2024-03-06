import { Route, Routes } from "react-router-dom";
import Home from "../Screens/Home";
import About from "../Screens/About";
import Register from "../Screens/Register";
import Login from "../Screens/Login";
import More from "../Screens/More";
import Contact from "../Screens/Contact";
import WeatherForecast from "../Screens/WeatherForecast";
import Unsubscribe from "../Screens/UnsubscribePage";

function AllRoutes() {

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/more' element={<More />} />
                <Route path='/unsubscribe-us' element={<Unsubscribe />} />
                <Route path='/more/weather-forecast' element={<WeatherForecast />} />
            </Routes>
        </>
    )
}

export default AllRoutes