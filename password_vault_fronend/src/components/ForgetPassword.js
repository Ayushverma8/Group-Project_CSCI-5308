import { useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import API_CLIENT from "../api/axiosClient";
import Input from '../components/common/Input'
import useForm from "../custom_hooks/useFormHook";

function ForgetPassword() {
    const [successMessage, setSuccessMessage] = useState(false);
    const [errMessage, setErrMessage] = useState(false);

    const forgotPassword = async () => {
        try {
            let res = await API_CLIENT.post('/forgot_password/', values);
            setSuccessMessage(true);
            setErrMessage(false);
        } catch (err) {
            setErrors(err.response.data);
            setSuccessMessage(false);
            setErrMessage(true);
        }
    }

    const { handleChange, handleSubmit, values, setValues, errors, setErrors } = useForm(forgotPassword);

    return (
        <Fragment>
            {successMessage &&
                <div className="mt-3 rounded text-success about-bottom p-3 bg-light">
                    Successfully sent OTP to Your email. Click <a href="/reset-password">here</a> to reset password
                </div>
            }
            {errMessage &&
                <div className="mt-3 rounded text-danger about-bottom p-3 bg-light">
                    Something went wrong
                </div>
            }

            <div className="w3-main mt-5">
                <div className="about-bottom main-agile book-form">
                    <h2 className="tittle">Forget Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-date-w3-agileits">
                            <label> Email </label>
                            <Input type="email" name="email" value={values.email} onChange={handleChange} errors={errors} placeholder="Your Email" required="" />
                        </div>

                        <div className="make wow shake">
                            <input type="submit" value="Submit" />
                        </div>

                        <div>
                            <p className="forgot-password text-right">
                                <a href="/reset-password">Click here to reset after getting email</a>
                            </p>
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

export default ForgetPassword;