import '../Styles/Navbar.css'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate=useNavigate()

    function isActive(path){
        return window.location.href.includes(path)
    }

    return (
        <>
            <nav class='container'>
            <div id='navbar'>
                <a class="brand-name" href="#">Weathering</a>
                
                    <ul id='nav-links-container'>
                        <li class={`nav-item ${isActive('home') ? 'active' : ''}`}>
                            <a class='nav-link' aria-current="page" onClick={()=>navigate('/home')}>Home</a>
                        </li>
                        <li class={`nav-item ${isActive('about') ? 'active' : ''}`}>
                            <a class='nav-link' aria-current="page" onClick={()=>navigate('/about')}>About</a>
                        </li>
                        <li class={`nav-item ${isActive('contact') ? 'active' : ''}`}>
                            <a class='nav-link' aria-current="page" onClick={()=>navigate('/contact')}>Contact</a>
                        </li>
                        <li class={`nav-item ${isActive('more') ? 'active' : ''}`}>
                            <a class='nav-link' aria-current="page" onClick={()=>navigate('/more')}>More</a>
                        </li>
                    </ul>
                    {/* <form>
                        <input id='search-bar' type="search" placeholder="Search Weather" />
                        <button id='search-btn' onClick={()=>navigate('/by-city-name')}>&#128269;</button>
                    </form> */}
                    <button id='signup-btn' onClick={()=>navigate('/login')} style={{display : isActive('login') ? "none":"flex" }}>Login</button>
                
            </div>
        </nav>
        </>
    )
}

export default Navbar