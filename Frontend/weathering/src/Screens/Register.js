import "../Styles/Register.css"

function Register() {


    function getOtp() {
        const name = document.getElementById("rname").value
        const email = document.getElementById("remail").value
        const password = document.getElementById("rpassword").value

        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude

                fetch("https://weather-website-0ltb.onrender.com/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    { name, email, password, lat, lon }
                )
            }).then((r) => {
                console.log(r)
                if (r.status == 200) {
                    document.getElementById("user-existed-warning").style.display = "none"
                }
                else if (r.status == 403) {
                    document.getElementById("user-existed-warning").style.display = "flex"
                }

            }).catch((err) => console.log(err))
        })
    }

    function verifyOTP() {
        const email = document.getElementById("remail").value
        const userEnteredOtp = document.getElementById("rotp").value
            fetch("https://weather-website-0ltb.onrender.com/register/otp-verification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                { email, userEnteredOtp }
            )
        }).then((r) => {
            console.log(r)
            if (r.status == 200) {
                document.getElementById("register-container").style.display = "none"
                document.getElementById("reg-success").style.display = "flex"
            }
            else if (r.status == 403) {
                document.getElementById("otp-expire").style.display = "flex"
                document.getElementById("invalid-otp").style.display = "none"
            }
            else if (r.status == 401) {
                document.getElementById("invalid-otp").style.display = "flex"
                document.getElementById("otp-expire").style.display = "none"
            }

        }).catch((err) => console.log(err))
    }

    return (
        <>
            <div id="reg-success">
                Registration Successfull !!!
            </div>
            <div id="register-container">
                <h1>REGISTER HERE</h1>
                <div class="sub-reg-container">
                    <label>Name</label>
                    <input type="text" id="rname" />
                </div>
                <div class="sub-reg-container">
                    <label id="user-existed-warning">USER ALREADY EXIXTED WITH THIS EMAIL ADDERSS !!!</label>
                    <label>Email</label>
                    <input type="email" id="remail" />
                </div>
                <div class="sub-reg-container">
                    <label>Set Password</label>
                    <input type="password" id="rpassword" />
                </div>
                <div class="sub-reg-container">
                    <label id="otp-expire">Time Limit Exceeded</label>
                    <label id="invalid-otp">Invalid OTP</label>
                    <label>OTP</label>
                    <input type="text" id="rotp" />
                </div>
                <button class="reg-btn" onClick={() => getOtp()}>Get OTP</button>
                <button class="reg-btn" onClick={() => verifyOTP()}>Verify</button>
            </div>
        </>
    )
}

export default Register