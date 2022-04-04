import API_CLIENT from "../api/axiosClient";
import Input from "./common/Input";
import useForm from "../custom_hooks/useFormHook";
import { Fragment } from "react/cjs/react.production.min";
import SideBar from './SideBar'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'axios'

function ProfilePage() {

	const [successMessage, setSuccessMessage] = useState(false);
	const [emailChanged, setEmailChanged] = useState(false);
	const[inputElement,setInputElement] = useState(null);

	const handleProfilePicSubmit = async() =>
	{
    let formData = new FormData();
	debugger
    formData.append('profile_pic',this.state.profilePic);
	try{
		let response = await API_CLIENT.get('user_profile/');
	}
	catch (e) {
		console.log(e)
	}
	}

	useEffect(async () => {
		try {
			let response = await API_CLIENT.get('user_profile/');

			setValues(response.data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	const updateProfile = async () => {
		try {
			let response = await API_CLIENT.patch('user_profile/', values);

			setSuccessMessage(true);
			if (response.data.email_changed) {
				setEmailChanged(true)
			}
		} catch (err) {
			setErrors(err.response.data);
		}
	}

	const handleProfilePicChange = async (e) => {
		const elem = document.getElementById("profile");
		setInputElement(elem.files[0]);

		try{
			const formData = new FormData();
			formData.append("image", elem.files[0]);
			debugger
			let response = await API_CLIENT.post('user/', formData);
			debugger
		}
		catch (e) {
			console.log(e)
		}
  	}


	const { handleChange, handleSubmit, values, setValues, errors, setErrors } = useForm(updateProfile);

	return (
		<Fragment>
			<SideBar />
			<div className="col-md-6 offset-4 mt-5">
				<div className="col-md-6 offset-3">
					{
						successMessage &&
						<div className="mt-3 mb-2 rounded text-success about-bottom p-3 bg-light border">
							Profile updated
							{
								emailChanged && ". Please check your email"
							}

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
							 <input
								 type="file"
								 id={"profile"}
								 accept=".jpg,.jpeg,.png"
								 onChange={() => handleProfilePicChange()}
							 />
          					<button onClick={handleProfilePicSubmit}>submit</button>
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