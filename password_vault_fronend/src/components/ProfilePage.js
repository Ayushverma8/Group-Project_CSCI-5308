import API_CLIENT from "../api/axiosClient";
import Input from "./common/Input";
import useForm from "../custom_hooks/useFormHook";
import { setUserLoggedIn } from "../utils/authHelpers";

function ProfilePage() {
	const profile = async () => {
		try {
			let res = await API_CLIENT.post('/profile/', values);
			setUserLoggedIn(res.data.token);
		} catch (e) {
			setErrors(e.response.data);
		}
	}

	const { handleChange, handleSubmit, values, setValues, errors, setErrors } = useForm(profile);
	const style = {
		background: "url('../assets/img/Main.jpg') fixed",
		backgroundSize: "cover",
		textAlign: "center",
	}

	return (
		<><div class="sidebar" data-color="white" data-active-color="danger">
			<div class="logo">
				<div class="logo-image-small">
					<img src="../assets/img/user (1).png" class="user-icon" />
				</div>
				<a href="#" class="simple-text logo-normal">
					<label id="lbluserid" style={{ fontWeight: "bolder" }}></label>
				</a>
			</div>
			<div class="sidebar-wrapper ">
				<ul class="nav">
					<li>
						<a href="/">
							<i class="nc-icon nc-bank logo-color"></i>
							<p>Dashboard</p>
						</a>
					</li>
					<li  >
						<a href="/notes">
							<i class="nc-icon nc-bullet-list-67 logo-color"></i>
							<p>Notes</p>
						</a>
					</li>
					<li  >
						<a href="/notes">
							<i class="nc-icon nc-box-2 logo-color"></i>
							<p>Vault</p>
						</a>
					</li>
					<li >
						<a href="./map.html">
							<i class="nc-icon nc-bookmark-2 logo-color"></i>
							<p>Todo</p>
						</a>
					</li>
					<li >
						<a href="./notifications.html">
							<i class="nc-icon nc-button-power logo-color"></i>
							<p>Logout</p>
						</a>
					</li>
					<li >
						<a href="./user.html">
							<i class="nc-icon nc-simple-remove logo-color"></i>
							<p>Delete Account</p>
						</a>
					</li>

				</ul>
			</div>
		</div>
			<div>
				<div className="w3-main mt-5" style={style}>
					<div className="about-bottom main-agile book-form">
						<h2 className="tittle">Account Settings</h2>
						<form onSubmit={handleSubmit}>
							<div className="form-date-w3-agileits">
								<label> First name </label>
								<Input type="text" name="first_name" placeholder="Your Name" required="true" value={values.first_name} onChange={handleChange} errors={errors} />
								<label> Last name </label>
								<Input type="text" name="last_name" placeholder="Your Name" required="true" value={values.last_name} onChange={handleChange} errors={errors} />
								<label> Email </label>
								<Input type="email" name="email" placeholder="Your Email" required="" value={values.email} onChange={handleChange} errors={errors} />
								<label> New Password </label>
								<Input type="password" name="password" placeholder="Your Password" required="" value={values.password} onChange={handleChange} errors={errors} />
							</div>
							<div className="make wow shake">
								<input type="submit" value="Save Changes" />
							</div>

							<div>

							</div>
						</form>
					</div>
				</div>
				<div className="footer-w3l">
					<p>&copy; All rights reserved | Design by Password Vault</p>
				</div>
			</div></>
	)
}

export default ProfilePage;