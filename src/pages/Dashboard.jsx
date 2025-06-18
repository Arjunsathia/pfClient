import React from "react";
import Header from "../components/Header";
import AddProject from "../components/AddProject";
import Profile from "../components/Profile";

function Dashboard() {
  return (
    <>
      <Header />
      <div className="container-fluid" style={{ minHeight: "65vh" }}>
        <h2>DashBoard</h2>
        <div className="row">
          <div className="col-9">
            <AddProject />
            <div className="w-100 border border-3 border-light p-2 mt-4">
              <div className="m-3 border border-2 border-warning p-2 d-flex justify-content-between align-items-center">
                <h5>Project Title</h5>
                <div>
                  <a href="" className="me-4">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <button className="btn me-3 border-0">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="btn me-3 border-0">
                    <i className="fa-solid fa-trash"></i>{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
