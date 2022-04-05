import { Fragment } from "react/cjs/react.production.min";
import API_CLIENT from "../api/axiosClient";
import Input from "./common/Input";
import useForm from "../custom_hooks/useFormHook";
import { getUserProfile, setUserLoggedIn, setUserProfile } from "../utils/authHelpers";

function Login() {
    const login = async () => {
        try {
            let res = await API_CLIENT.post('/login/', values);
            setUserProfile(
               res.data.user.first_name,
              res.data.user.last_name
            )
            setUserLoggedIn(res.data.token);
        } catch (err) {
            setErrors(err.response.data);
        }
    }

    const { handleChange, handleSubmit, values, setValues, errors, setErrors } = useForm(login);

    return (
        <Fragment>
            <link href="css/style_Login.css" rel="stylesheet" type="text/css" media="all"></link>
            <div className="w3-main mt-5" >
                <div className="about-bottom main-agile book-form">
                    <h2 className="tittle">Login Here</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-date-w3-agileits">
                            <label> Email </label>
                            <Input type="email" name="email" value={values.email} onChange={handleChange} errors={errors} placeholder="Your Email" required="" />
                            <label> Password </label>
                            <Input type="password" name="password" value={values.password} onChange={handleChange} errors={errors} placeholder="Your Password" required="" />
                        </div>

                        <div className="make wow shake">
                            <input type="submit" value="Login" />
                        </div>

                        <div>
                            <p className="forgot-password text-right">
                                <a href="/forgot-password">Forgot password?</a>
                            </p>
                            <p className="forgot-password text-right">
                                <a href="/signup">New User?</a>
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

export default Login;