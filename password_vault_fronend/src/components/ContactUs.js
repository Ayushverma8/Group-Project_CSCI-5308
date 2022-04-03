import { Fragment } from "react/cjs/react.production.min";
import Input from "./common/Input";

function ContactUs() {

    return (
        <Fragment>
            <link href="css/style_Login.css" rel="stylesheet" type="text/css" media="all"></link>
            <div className="w3-main mt-5">
                <div className="about-bottom main-agile book-form">
                    <h2 className="tittle">How can we help you?</h2>
                    <form >
                        <div className="form-date-w3-agileits">
                            <label> First name </label>
                            <Input type="text" name="first_name" placeholder="Your Name" required="true" />
                            <label> Last name </label>
                            <Input type="text" name="last_name" placeholder="Your Name" required="true" />
                            <label> Email </label>
                            <Input type="email" name="email" placeholder="Your Email" required="" />
                            <label> Country </label>
                            <Input type="text" name="country" placeholder="Your Country" required="" />
                            <label> Message </label>
                            <Input type="text" name="message" placeholder="Your Message" required="" />
                        </div>
                        <div className="make wow shake">
                            <input type="submit" value="Send" />
                        </div>

                        <div>
                            <h5 style={{ color: '#ffffff', paddingTop: '40px', lineHeight: '36px' }}><i class="fa fa-envelope" style={{ fontSize: '25px', color: '#ffffff' }}></i>    info@passwordvault.com</h5>
                            <h5 style={{ paddingRight: '77px', color: '#ffffff' }}><i class="fa fa-phone" style={{ fontSize: '25px', color: '#ffffff' }}></i>    +1 902412560</h5>
                        </div>
                    </form>
                </div>
            </div>
            <div className="footer-w3l">
                <p>&copy; All rights reserved | Design by Password Vault</p>
            </div>
        </Fragment>
    )
}

export default ContactUs;