import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function Auth() {
  const [authState, setAuthState] = useState(false);
  const handleAuthState = () => {
    setAuthState(!authState);
  };
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="p-3 border border-light border-3 w-75">
        <div className="row">
          <div className="col">
            <img
              src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?semt=ais_hybrid&w=740"
              alt=""
              className="w-75"
            />
          </div>
          <div className="col">
            <h2>{authState ? <>Registration</> : <>Login</>}</h2>
            <div className="mt-4 ">
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
              {authState && (
                <>
                  <FloatingLabel
                    controlId="floatingInp"
                    label="user Name"
                    className="mb-3"
                  >
                    <Form.Control type="text" placeholder="username..." />
                  </FloatingLabel>
                </>
              )}
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
              <div className="d-flex justify-content-between mt-5">
                {authState ? (
                  <button className="btn btn-success">Register</button>
                ) : (
                  <button className="btn btn-success">Login</button>
                )}
                <button className="btn btn-link" onClick={handleAuthState}>
                  {authState ? "Already a user?" : "New User?"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
