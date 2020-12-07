import React from "react";
import { Navbar, Nav } from "react-bootstrap";
// import logo from "../images/logo.svg";
// import githubIco from "../images/github_icon.png";
import { NavLink } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">SUPER__MOVIES</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/toprate">
            TopRatedPage
          </Nav.Link>
          <Nav.Link as={NavLink} to="/popular">
            PopularPage
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavbar;
