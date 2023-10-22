import '../Styles/Navbar.css'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate=useNavigate()

    return (
        <>
            <nav class='container'>
            <div id='navbar'>
                <a class="brand-name" href="#">Weathering</a>
                
                    <ul id='nav-links-container'>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" onClick={()=>navigate('/home')}>Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" onClick={()=>navigate('/about')}>About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" onClick={()=>navigate('/contact')}>Contact</a>
                        </li>
                    </ul>
                    <form>
                        <input id='search-bar' type="search" placeholder="Search" />
                    </form>
                
            </div>
        </nav>
        </>
    )
}

export default Navbar