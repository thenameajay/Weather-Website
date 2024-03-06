import "../Styles/Login.css"
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    function verifyUser() {
        const email = document.getElementById("lemail").value
        const password = document.getElementById("lpassword").value

        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude

                fetch("https://weather-website-0ltb.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    { email, password, lat, lon }
                )
            }).then((r) => {

                if (r.status == 312) {
                    document.getElementById("warning").style.display = "flex"
                }
                else if (r.status == 200) {
                    document.getElementById("login-container").style.display = "none"
                    document.getElementById("login-success").style.display = "flex"
                }

            }).catch((err) => console.log(err))
        })
    }

    return (
        <>
            <div id="login-success">
                Login Successfull !
            </div>
            <div id="login-container">
                <h1>LOGIN HERE</h1>
                <label id="warning">Invalid Username or Password</label>
                <div class="sub-login-container">
                    <label>Email</label>
                    <input type="email" id="lemail" placeholder="example@abc.com" />
                </div>
                <div class="sub-login-container">
                    <label>Enter Password</label>
                    <input type="password" id="lpassword" placeholder="Enter password" />
                </div>
                <button id="verify-login-btn" onClick={() => verifyUser()}>PROCEED</button>
                {/* <br/> */}
                <div id="reg-in-login">
                    <button id="verify-reg-btn" onClick={() => navigate("/register")}>Sign Up</button>
                </div>
            </div>
        </>
    )
}

export default Login

// https://weather-website-0ltb.onrender.com