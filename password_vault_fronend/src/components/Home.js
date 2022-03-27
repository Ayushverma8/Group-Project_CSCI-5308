import { useEffect, useState } from "react";
import API_CLIENT from "../api/axiosClient";
import { Card } from "react-bootstrap";
import { Fragment } from "react/cjs/react.production.min";
import SideBar from "./SideBar";
import PasswordVault from "./PasswordVault";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-quill/dist/quill.snow.css';
import { Button, Modal } from 'react-bootstrap';
import Input from "./common/Input";


function Home() {
	const [modalShow, setModalShow] = useState(false);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const Vaults = [
		{ image_path: "../assets/img/outlook.jpeg", title: "Outlook" },
		{ image_path: "../assets/img/google.png", title: "Google" },
		{ image_path: "../assets/img/linkedin.png", title: "Linkedin" },
		{ image_path: "../assets/img/dalhousie.png", title: "Dalhousie" },
		{ image_path: "../assets/img/netflix.png", title: "Netflix" },
		{ image_path: "../assets/img/amazon.png", title: "Amazon" },
		{ image_path: "../assets/img/facebook.png", title: "Facebook" }
	];

	const renderboostrapCard = (data, index) => {
		return (
			<>
				<div class="col-lg-3 col-md-6 col-sm-6">
					<div class="card card-stats">
						<div class="card-body" onClick={handleShow}>
							<div class="row">
								<div class="col-5 col-md-10">
									<div>
										<img src={data.image_path} class="card-logo"></img>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-12 col-md-10">
									<p class="card-title">{data.title}</p>
								</div>
							</div>
							<div class="row">
								<div class="col-5 col-md-10">
									<p class="card-category">{data.user_id}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}

	return (<>
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			
		>
			<Modal.Header closeButton>
				<Modal.Title>Enter M-PIN</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Input type="text" name="m_pin" placeholder="M-PIN" required="true"/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={() => setModalShow(true)}>Submit</Button>
			</Modal.Footer>
		</Modal>
		<PasswordVault
			show={modalShow}
			onHide={() => setModalShow(false)}
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
								<a class="navbar-brand" href="javascript:;">Password Vault  {show ? null : <FontAwesomeIcon className='ms-2' data-tip="Click to add new password" onClick={handleShow} icon="fa-solid fa-plus" />}</a>
							</div>
							<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
								<span class="navbar-toggler-bar navbar-kebab"></span>
								<span class="navbar-toggler-bar navbar-kebab"></span>
								<span class="navbar-toggler-bar navbar-kebab"></span>
							</button>
							<div class="collapse navbar-collapse justify-content-end" id="navigation">
								<form>
									<div class="input-group no-border">
										<input type="text" value="" class="form-control" placeholder="Search..." />
										<div class="input-group-append">
											<div class="input-group-text">
												<i class="nc-icon nc-zoom-split"></i>
											</div>
										</div>
									</div>
								</form>
								<ul class="navbar-nav">
									<li class="nav-item">
										<a class="nav-link btn-magnify" href="javascript:;">
											<p>
												<span class="d-lg-none d-md-block">Stats</span>
											</p>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link btn-rotate" href="javascript:;">
											<i class="nc-icon nc-settings-gear-65"></i>
											<p>
												<span class="d-lg-none d-md-block">Account</span>
											</p>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</nav>

					<div class="content">
						<div class="row">
							{Vaults.map(renderboostrapCard)}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	</>
	)
}


export default Home;
