import { useEffect, useState } from "react";
import API_CLIENT from "../api/axiosClient";
import { Fragment } from "react/cjs/react.production.min";
import SideBar from "./SideBar";
import PasswordVault from "./PasswordVault";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-quill/dist/quill.snow.css';
import { Button, Modal } from 'react-bootstrap';
import Input from "./common/Input";


function Home() {
	const [modalShow, setModalShow] = useState(false);
	const [passwords, setPasswords] = useState([]);
	const [objectData, setObjectData] = useState({})

	const closeModal = () => {
		setModalShow(false);
		setObjectData({})
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

	const renderboostrapCard = (data, index) => {
		return (
			<>
				<div class="col-lg-3 col-md-6 col-sm-6 cursor-pointer" onClick={() => openPasswordModal(data.id)}>
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
							</div>
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
