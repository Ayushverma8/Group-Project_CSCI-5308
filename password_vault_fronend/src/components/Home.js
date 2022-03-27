import { useEffect, useState } from "react";
import API_CLIENT from "../api/axiosClient";
import { Card } from "react-bootstrap";
import { Fragment } from "react/cjs/react.production.min";
import SideBar from "./SideBar";


function Home() {
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
						<div class="card-body">
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

	return (
		<Fragment>
			<div class="wrapper ">
				<SideBar />
				<div class="main-panel">
					<nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
						<div class="container-fluid">
							<div class="navbar-wrapper">
								<a class="navbar-brand" href="javascript:;">Password Vault</a>
							</div>

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
	)
}


export default Home;
