import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import API_CLIENT from "../api/axiosClient";
import useForm from "../custom_hooks/useFormHook";
import Input from "./common/Input";

function ContactUs() {
    const [successMessage, setSuccessMessage] = useState(false);

    const contactUs = async () => {
        try {
            await API_CLIENT.post('contact-us/', values);
            setSuccessMessage(true)
        } catch (err) {
            setErrors(err.response.data);
        }
    }

    const { handleChange, handleSubmit, values, setValues, errors, setErrors } = useForm(contactUs);
    return (
        <Fragment>
            <link href="css/style_Login.css" rel="stylesheet" type="text/css" media="all"></link>
            {successMessage &&
                <div className="mt-3 rounded text-success about-bottom p-3 bg-light">
                    Successfully sent your message to admins
                </div>
            }
            <div className="w3-main mt-5">
                <div className="about-bottom main-agile book-form">
                    <h2 className="tittle">How can we help you?</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-date-w3-agileits">
                            <label> First name </label>
                            <Input type="text" value={values.first_name} errors={errors} onChange={handleChange} name="first_name" placeholder="Your Name" required="true" />
                            <label> Last name </label>
                            <Input type="text" value={values.last_name} errors={errors} onChange={handleChange} name="last_name" placeholder="Your Name" required="true" />
                            <label> Email </label>
                            <Input type="email" value={values.email} errors={errors} onChange={handleChange} name="email" placeholder="Your Email" required="" />
                            <label> Message </label>
                            <Input type="text" value={values.message} errors={errors} onChange={handleChange} name="message" placeholder="Your Message" required="" />
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