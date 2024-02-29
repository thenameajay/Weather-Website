import "../Styles/Contact.css"
import { Link } from "react-router-dom"

function Contact() {

    return (
        <>
            <div id="contact-container">
                {/* <Link class="contact-links" to="www.github.com">Github</Link> */}
                <a class="contact-links" href="https://www.github.com/thenameajay"><button class="contact-btn">Github</button></a>
                <a class="contact-links" href="https://www.linkedin.com/in/ajay-sharma-a02250238?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><button class="contact-btn">Linked In</button></a>
            </div>
        </>
    )
}

export default Contact