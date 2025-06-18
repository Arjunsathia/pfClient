import React from "react";
import Header from "../components/Header";
import Projectcard from "../components/ProjectCard";

function Projects() {
  return (
    <>
      <Header />
      <div className="container-fluid" style={{ minHeight: "70vh" }}>
        <div className="d-flex justify-content-between my-5">
          <h1>All Projects</h1>
          <input
            type="search"
            placeholder="Search with Language"
            className="form-control w-25"
            name=""
            id=""
          />
        </div>
        <div className="d-flex flex-wrap justify-content-around">
          <Projectcard />
        </div>
      </div>
    </>
  );
}

export default Projects;
