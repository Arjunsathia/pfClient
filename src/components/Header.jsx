import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { authContext } from "../ContextApi/ContextApi";
import { useNavigate } from "react-router-dom";

function Header() {
  const { setAuthStatus } = useContext(authContext);
  const nav = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    setAuthStatus(false);
    nav("/");
  };
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            React Bootstrap
          </Navbar.Brand>
          <button onClick={handleLogout} className="btn btn-danger">
            LogOut {``} <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
