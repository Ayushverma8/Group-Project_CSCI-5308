import React from 'react';
import { Link } from "react-router-dom";
import {
	Navbar,
	Nav,
	NavItem,
	NavbarBrand,
	Container
} from "reactstrap";

function Heading() {
	return (
		<div style={{ maxWidth: "30rem", margin: "4rem auto", paddingTop: "40px" }}>
			<Navbar color="dark" dark>
				<Container className='new-container'>
					<NavbarBrand href="/">My Notes</NavbarBrand>
					<Nav>
						<NavItem>
							<Link className="btn btn-primary" to="/add">Add Note</Link>
						</NavItem>
					</Nav>

				</Container>
			</Navbar>
		</div>
	)
}

export default Heading;
