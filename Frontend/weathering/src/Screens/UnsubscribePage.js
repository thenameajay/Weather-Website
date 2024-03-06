import "../Styles/Login.css"

function UnsubscribePage(){
    function unsubscribeMe(){
        const unsubscribingMail=document.getElementById("uscemail").value
        const password=document.getElementById("uscpassword").value
        fetch("https://weather-website-0ltb.onrender.com/unsubscribe-us", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(
                    {unsubscribingMail,password}
                )
            })
    }

    return (
        <>
            <div id="outer-div-unsubscribe">
                <input type="email" id="uscemail" placeholder="example@abc.com"/>
                <input type="password" id="uscpassword" placeholder="Enter password"/>
                <button id="unsubscribe-btn" onClick={()=>unsubscribeMe()}>Unsubscribe</button>
            </div>
        </>
    )
}

export default UnsubscribePage