
function Register(){

    return(
        <>
            <label>Email</label>
            <input type="email" />
            <label>OTP</label>
            <input type="number" />
            <label>Set Password</label>
            <input type="password" />
            <button id="submit-btn">Submit</button>
        </>
    )
}

export default Register