import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../ContextApi/ContextApi";

function Header() {
  const { setAuthStatus } = useContext(authContext);
  const nav = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    setAuthStatus(false);
    nav("/");
  };

  return (
    <Navbar
      expand="lg"
      className="py-3"
      style={{
        background: "linear-gradient(90deg, #1f1c2c, #928dab)", // Dark gradient
        color: "#fff",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2 text-white fw-semibold fs-5"
        >
          <i class="fa-solid fa-code-merge fa-2xl"></i>
          CodeDock
        </Navbar.Brand>

        <button
          type="button"
          onClick={handleLogout}
          className="px-3 py-2 d-flex align-items-center gap-2 rounded-pill"
          style={{
            backgroundColor: "#1abc9c", // Teal color
            border: "none",
            color: "#fff",
            fontWeight: 500,
          }}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>
      </Container>
    </Navbar>
  );
}

export default Header;
