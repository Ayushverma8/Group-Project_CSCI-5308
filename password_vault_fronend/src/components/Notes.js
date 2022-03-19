import React, { useEffect, useState } from 'react';
import {
	ListGroup,
} from "reactstrap";
import SideBar from "./SideBar";
import API_CLIENT from "../api/axiosClient";
import { getHeaders } from '../utils/authHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactTooltip from 'react-tooltip';

function Notes() {
	const [notes, setNotes] = useState([]);

	useEffect(async () => {
		try {
			let response = await API_CLIENT.get('notes/', {
				headers: getHeaders()
			})
			setNotes(response.data.results)
			console.log(response.data.results)
		} catch (err) {
			console.log(err)
		}
	}, [])

	return (
		<ListGroup className="mt-4">
			<SideBar />

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

					</div>

					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-bar navbar-kebab"></span>
						<span class="navbar-toggler-bar navbar-kebab"></span>
						<span class="navbar-toggler-bar navbar-kebab"></span>
					</button>
					<div>


					</div>
					<div class="collapse navbar-collapse justify-content-end" id="navigation">
						<a class="navbar-brand" style={{ paddingRight: "650px" }} href="#">Notes <a href='/notes/add/'><FontAwesomeIcon data-tip="Click to add new notes" icon="fa-solid fa-plus" /></a></a>
						<ReactTooltip />

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
									{/* <i class="nc-icon nc-layout-11"></i> */}
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

			<div className='col-md-9 offset-3 row mt-5'>
				{
					notes.map((item, index) => {
						return (
							<div class="card col-md-4 border">
								<h5 class="card-header">{item.title}</h5>
								<div class="card-body">
									<p class="card-text">{item.text}</p>
									<a href="#" class="btn btn-primary" style={{ 'margin-right': '3px' }}>Edit</a>
									<a href="#" class="btn btn-danger">Delete</a>
								</div>
							</div>
						)
					})
				}

			</div>

		</ListGroup>
	)
}

export default Notes;
