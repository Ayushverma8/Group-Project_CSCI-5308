import { Fragment } from "react/cjs/react.production.min";
import API_CLIENT from "../api/axiosClient";
import useForm from "../custom_hooks/useFormHook";
import { useNavigate } from "react-router-dom";
import Input from "./common/Input";
import { useEffect } from "react";


function MpinValidation() {
    const navigate = useNavigate();

    const validateMpin = async () => {
        try {
            await API_CLIENT.post('validate_mpin/', values);
            navigate('/');
        } catch (err) {
            setErrors(err.response.data);
        }
    }

    useEffect(async () => {
        try {
            let response = await API_CLIENT.get('validate_mpin/');
            if (response.data.validated) {
                navigate('/');
            }
        } catch (err) {
            console.log(err.response.data)
        }
    }, [])

    const { handleChange, handleSubmit, values, setValues, errors, setErrors } = useForm(validateMpin);

    return (
        <Fragment>
            <link href="css/style_Login.css" rel="stylesheet" type="text/css" media="all"></link>
            <div className="w3-main mt-5" >
                <div className="about-bottom main-agile book-form">
                    <h2 className="tittle">Validate your Mpin here</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-date-w3-agileits">
                            <label> Mpin </label>
                            <Input type="text" name="mpin" value={values.mpin} onChange={handleChange} errors={errors} placeholder="Your Mpin" required="" />
                        </div>

                        <div className="make wow shake">
                            <input type="submit" value="Validate" />
                        </div>

                        <div>
                            <p className="forgot-password text-right">
                                <a href="#">Forgot Mpin ?</a>
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

export default MpinValidation;