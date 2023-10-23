import { Route, Routes } from "react-router-dom";
import Home from "../Screens/Home";
import About from "../Screens/About";
import Register from "../Screens/Register";

function AllRoutes() {

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </>
    )
}

export default AllRoutes