import { useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import API_CLIENT from "../api/axiosClient";
import Input from "./common/Input";
import useForm from "../custom_hooks/useFormHook";
import { setUserLoggedIn } from "../utils/authHelpers";

function ResetPassword() {

	const forgotPassword = async () => {
		try {
			let res = await API_CLIENT.post('/reset_password/', values);
			setUserLoggedIn(res.data.token);
		} catch (err) {
			setErrors(err.response.data);
		}
	}

	const { handleChange, handleSubmit, values, setValues, errors, setErrors } = useForm(forgotPassword);

	return (
		<Fragment>
			<link href="css/style_Login.css" rel="stylesheet" type="text/css" media="all"></link>
			<div className="w3-main mt-5">
				<div className="about-bottom main-agile book-form">
					<div className="alert-close"> </div>
					<h2 className="tittle">Reset Password Here</h2>
					<form onSubmit={handleSubmit}>
						<div className="form-date-w3-agileits">
							<label> Email </label>
							<Input type="email" name="email" value={values.email} onChange={handleChange} errors={errors} placeholder="Your Email" required="" />
							<label> OTP </label>
							<Input type="text" name="otp" value={values.otp} onChange={handleChange} errors={errors} placeholder="Your OTP" required="" />
							<label> Password </label>
							<Input type="password" name="password" value={values.password} onChange={handleChange} errors={errors} placeholder="Your Password" required="" />
						</div>
						<div className="make wow shake">
							<input type="submit" value="Reset" />
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

export default ResetPassword;