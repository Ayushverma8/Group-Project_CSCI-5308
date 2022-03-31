import API_CLIENT from "../api/axiosClient";
import Input from "./common/Input";
import useForm from "../custom_hooks/useFormHook";
import { setUserLoggedIn } from "../utils/authHelpers";
import { Fragment } from "react/cjs/react.production.min";

function Signup() {
	const signUp = async () => {
		try {
			let res = await API_CLIENT.post('/signup/', values);
			setUserLoggedIn(res.data.token);
		} catch (e) {
			setErrors(e.response.data);
		}
	}

	const { handleChange, handleSubmit, values, setValues, errors, setErrors } = useForm(signUp);

	return (
		<Fragment>
			<link href="css/style_Login.css" rel="stylesheet" type="text/css" media="all"></link>
			<div className="w3-main mt-5">
				<div className="about-bottom main-agile book-form">
					<h2 className="tittle">Register Here</h2>
					<form onSubmit={handleSubmit}>
						<div className="form-date-w3-agileits">
							<label> First name </label>
							<Input type="text" name="first_name" placeholder="Your Name" required="true" value={values.first_name} onChange={handleChange} errors={errors} />

							<label> Last name </label>
							<Input type="text" name="last_name" placeholder="Your Name" required="true" value={values.last_name} onChange={handleChange} errors={errors} />

							<label> Email </label>
							<Input type="email" name="email" placeholder="Your Email" required="" value={values.email} onChange={handleChange} errors={errors} />

							<label> Password </label>
							<Input type="password" name="password" placeholder="Your Password" required="" value={values.password} onChange={handleChange} errors={errors} />

							<label> Confirm Password </label>
							<Input type="password" name="confirm_password" placeholder="Confirm Password" required="true" value={values.confirm_password} onChange={handleChange} errors={errors} />

							<label> Mpin </label>
							<Input type="password" name="mpin" placeholder="4 digit pin" required="true" value={values.mpin} onChange={handleChange} errors={errors} />
						</div>
						<div className="make wow shake">
							<input type="submit" value="Register" />
						</div>

						<div>
							<p className="forgot-password text-right">
								Already Registered? <a href="/login">Login</a>
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

export default Signup;