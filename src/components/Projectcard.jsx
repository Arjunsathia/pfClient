import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function Projectcard() {
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
                src="https://tse2.mm.bing.net/th?id=OIP.y_iP084zhHga4tTD2Ijt_QHaEK&pid=Api&P=0&h=180"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col">
              <h2>Project Title</h2>
              <p>
                <span className="fw-bolder">Description</span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorum, ex.
              </p>
              <p>
                <span className="fw-bolder">languages : HTML,CSS,JS</span>
              </p>
              <div className="d-flex justify-content-between">
                <a href="">
                  <i class="fa-brands fa-github"></i>
                </a>
                <a href="">
                  <i class="fa-solid fa-link"></i>
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
