import { useEffect, useState } from "react";
import API_CLIENT from "../api/axiosClient";
import { Fragment } from "react/cjs/react.production.min";
import SideBar from "./SideBar";
import PasswordVault from "./PasswordVault";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-quill/dist/quill.snow.css';
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home() {
	const [modalShow, setModalShow] = useState(false);
	const [passwords, setPasswords] = useState([]);
	const [objectData, setObjectData] = useState({})
	const notify = () => toast("Wow so easy!");

	const closeModal = () => {
		setModalShow(false);
		setObjectData({});
	}

	const getPasswords = async () => {
		try {
			let response = await API_CLIENT.get('vault/');
			setPasswords(response.data.results)
			setModalShow(false)
			setObjectData({})
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getPasswords();
	}, [])

	const openPasswordModal = async (id) => {
		try {
			let response = await API_CLIENT.get(`vault/${id}/`)
			setObjectData(response.data)
			setModalShow(true)
		} catch (err) {
			console.log(err)
		}
	}

	const exportPdf = () => {
		if (passwords.length == 0) {
			toast.warning('Sorry ! You do not have any passwords')
			return;
		}

		const promise = API_CLIENT.get('export/')
			.then((response) => {
				let file = response.data.file;
				var a = document.createElement("a");
				a.href = 'data:application/pdf;base64,' + file;
				a.download = "passwords.pdf";
				a.click();
			}).catch((err) => err);

		toast.promise(promise, {
			pending: 'Creating pdf for you.',
			success: 'Successfully exported pdf.',
			error: 'Something went wrong'
		})
	}

	const renderboostrapCard = (data, index) => {
		return (
			<>
				<div class="col-lg-3 col-md-6 col-sm-6 cursor-pointer"
					 data-html="true" data-tip={data.owner ? "": "Shared by someone"} onClick={() => openPasswordModal(data.id)}>
					<div class="card card-stats">
						<div class="card-body">
							<div class="row">
								<div class="col-5 col-md-10">
									<div>
										<img src={data.logo_url || "../assets/img/user.png"} class="card-logo"></img>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-12 col-md-10">
									<p class="card-title">{data.website_name}</p>
								</div>
								{
									data.password_pwned ?
										<div class="col-md-2">
											<FontAwesomeIcon data-html="true" data-tip="This password is previously exposed and very likely to be breached.<br/> We suggest to change it" className="red-font" icon="fas fa-exclamation-triangle" />
											<ReactTooltip />
										</div>
										: null
								}
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}

	return (<>
		<PasswordVault
			onHide={closeModal}
			show={modalShow}
			objectData={objectData}
			getPasswords={getPasswords}
		/>

		<Fragment>
			<div class="wrapper ">
				<SideBar />
				<ToastContainer />
				<div class="main-panel">
					<nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
						<div class="container-fluid">
							<div class="navbar-wrapper">
								<div class="navbar-toggle">
									<button type="button" class="navbar-toggler">
										<span class="navbar-toggler-bar bar1"></span>
										<span class="navbar-toggler-bar bar2"></span>
										<span class="navbar-toggler-bar bar3"></span>
									</button>
								</div>
								<a class="navbar-brand" href="javascript:;">Password Vault  <FontAwesomeIcon onClick={() => setModalShow(true)} className='ms-2' data-tip="Click to add new password" icon="fa-solid fa-plus" /></a>
								<ReactTooltip />
							</div>
						</div>
						<div class="pull-right mr-2" style={{ width: '20%' }}>
							<button onClick={exportPdf} className="btn btn-success">Export to pdf</button>
						</div>
					</nav>

					<div class="content">
						<div class="row">
							{passwords.map(renderboostrapCard)}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	</>
	)
}


export default Home;
