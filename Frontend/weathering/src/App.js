import Navbar from "./Layout/Navbar";
import AllRoutes from "./Routing/AllRoutes";
import "./Styles/App.css"


function App() {

    return (
        <>
            <section id="body">
                <Navbar/>
                <AllRoutes />
            </section>
        </>
    )
}

export default App