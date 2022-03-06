import React, { useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import {
	ListGroup,
	ListGroupItem,
	Button
} from "reactstrap";

function NotesList() {
	const { notes, removeNote } = useContext(GlobalContext);

	return (
		<ListGroup className="mt-4">
			<div class="sidebar" data-color="white" data-active-color="danger">
				<div class="logo">
					<div class="logo-image-small">
						<img src="../assets/img/user (1).png" class="user-icon" />
					</div>
					<a href="#" class="simple-text logo-normal">
						<label id="lbluserid" style={{ fontWeight: "bolder" }}>Manasvi Sharma</label>
					</a>
				</div>
				<div class="sidebar-wrapper ">
					<ul class="nav">
						<li>
							<a href="/home">
								<i class="nc-icon nc-bank logo-color"></i>
								<p>Dashboard</p>
							</a>
						</li>
						<li  >
							<a href="/notes">
								<i class="nc-icon nc-box-2 logo-color"></i>
								<p>Vault</p>
							</a>
						</li>
						<li  >
							<a href="/notes">
								<i class="nc-icon nc-bullet-list-67 logo-color"></i>
								<p>Notes</p>
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
						<a class="navbar-brand" style={{ paddingRight: "700px" }} href="#">Password Vault</a>
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
							{/* <li class="nav-item btn-rotate dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="nc-icon nc-bell-55"></i>
                  <p>
                    <span class="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </li> */}
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
			{notes.length > 0 ? (
				<>
					{notes.map(note => (
						<ListGroupItem className="" key={note.id}>
							<strong>{note.name}</strong>
							<div className="ml-auto pull-right">
								<Link to={`/edit/${note.id}`} className="btn btn-warning mr-3" style={{ color: "#f8f9fa", backgroundColor: "#23314e", borderColor: "#23314e" }}>Edit</Link>
								<Button onClick={() => removeNote(note.id)} color="danger">Delete</Button>
							</div>
						</ListGroupItem>
					))}
				</>
			) : (
				<h4 className="text-center">No Notes</h4>
			)}
		</ListGroup>
	)
}

export default NotesList;
