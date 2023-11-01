import "../Styles/Register.css"

function Register() {

    return (
        <>
            <div id="register-container">
                <h1>REGISTER HERE</h1>
                <div class="sub-reg-container">
                    <label>Email</label>
                    <input type="email" />
                </div>
                <button class="reg-btn">Get OTP</button>
                <div class="sub-reg-container">
                    <label>OTP</label>
                    <input type="text" />
                </div>
                <div class="sub-reg-container">
                    <label>Set Password</label>
                    <input type="password" />
                </div>
                <button class="reg-btn">Submit</button>
            </div>
        </>
    )
}

export default Register