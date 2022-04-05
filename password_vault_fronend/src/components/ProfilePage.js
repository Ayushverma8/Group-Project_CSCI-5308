import API_CLIENT from "../api/axiosClient";
import Input from "./common/Input";
import useForm from "../custom_hooks/useFormHook";
import { Fragment } from "react/cjs/react.production.min";
import SideBar from './SideBar'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserProfile, setUserProfile } from "../utils/authHelpers";

function ProfilePage() {

	const [successMessage, setSuccessMessage] = useState(false);
	const [emailChanged, setEmailChanged] = useState(false);
	const [userProfile, setUserProfileHere] = useState({});


	useEffect(async () => {
		try {
			let response = await API_CLIENT.get('user_profile/');
			setUserProfile(response.data.first_name, response.data.last_name)
			setUserProfileHere(getUserProfile());
			setValues(response.data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	const updateProfile = async () => {
		try {
			let response = await API_CLIENT.patch('user_profile/', values);
			setSuccessMessage(true);
			await setTimeout(setUserProfile(values.first_name, values.last_name), 300);
			setUserProfileHere(getUserProfile());

			if (response.data.email_changed) {
				setEmailChanged(true)
			}
		} catch (err) {
			setErrors(err.response.data);
		}
	}

	const { handleChange, handleSubmit, values, setValues, errors, setErrors } = useForm(updateProfile);

	return (
		<Fragment>
			<SideBar profile={userProfile}/>
			<div className="col-md-6 offset-4 mt-5">
				<div className="col-md-6 offset-3">
					{
						successMessage &&
						<div className="mt-3 mb-2 rounded text-success about-bottom p-3 bg-light border">
							Profile updated
							<FontAwesomeIcon style={{ marginLeft: '5px' }} icon="fa-solid fa-check" />
						</div>
					}

					<h2 className="tittle">Account Settings</h2>
					<form onSubmit={handleSubmit}>
						<div className="form-date-w3-agileits">
							<label className="pull-left"> First name </label>
							<Input type="text" name="first_name" placeholder="Your Name" required="true" value={values.first_name} onChange={handleChange} errors={errors} />
							<label className="pull-left"> Last name </label>
							<Input type="text" name="last_name" placeholder="Your Name" required="true" value={values.last_name} onChange={handleChange} errors={errors} />
							<label className="pull-left"> Email </label>
							<Input type="email" name="email" placeholder="Your Email" required="" value={values.email} onChange={handleChange} errors={errors} />
							<label className="pull-left"> New Password </label>
							<Input type="password" name="password" placeholder="Your Password" required="" value={values.password} onChange={handleChange} errors={errors} />
						</div>
						<div className="make wow shake">
							<button type="submit" className="btn btn-primary" >Save changes</button>
						</div>
					</form>
				</div>
			</div>
		</Fragment>
	)
}

export default ProfilePage;