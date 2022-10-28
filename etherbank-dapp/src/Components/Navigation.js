import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
const Navigation = () => {
	return (


		<Navbar className="text-center" bg="dark" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand href="#home">Ether Bank</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/">Accounts Overview</Nav.Link>
						<Nav.Link href="/create">Create New Account</Nav.Link>

					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;