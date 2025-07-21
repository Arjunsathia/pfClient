import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import base_url from "../Services/base_url";

function Projectcard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          onClick={handleShow}
          style={{ cursor: "pointer" }}
          variant="top"
          src="https://tse2.mm.bing.net/th?id=OIP.y_iP084zhHga4tTD2Ijt_QHaEK&pid=Api&P=0&h=180"
        />
        <Card.Body>
          <Card.Title>Blog</Card.Title>
        </Card.Body>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <img
                src={`${base_url}/projectimg/${project.image}`}
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col">
              <h2>{project.title}</h2>
              <p>
                <span className="fw-bolder">Description :</span>
                {project.description}
              </p>
              <p>
                <span className="fw-bolder">languages : {project.language}</span>
              </p>
              <div className="d-flex justify-content-between">
                <a href={project.gitrepo}>
                  <i className="fa-brands fa-github"></i>
                </a>
                <a href={project.demo}>
                  <i className="fa-solid fa-link"></i>
                </a>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Projectcard;
