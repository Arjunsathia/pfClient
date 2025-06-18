import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddProject() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-success" onClick={handleShow}>
        Add to List
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Projects Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <label htmlFor="ff">
                <input
                  type="file"
                  style={{ display: "none" }}
                  name=""
                  id="ff"
                />
                <img
                  src="https://static.thenounproject.com/png/187803-200.png"
                  alt=""
                  className="img-fluid"
                />
              </label>
            </div>
            <div className="col">
              <input
                type="text"
                placeholder="Enter Title"
                className="form-control mb-3 "
                name=""
                id=""
              />
              <input
                type="text"
                placeholder="Enter description"
                className="form-control mb-3"
                name=""
                id=""
              />
              <input
                type="text"
                placeholder="Enter language"
                className="form-control mb-3"
                name=""
                id=""
              />
              <input
                type="text"
                placeholder="Enter Git Repo URl"
                className="form-control mb-3"
                name=""
                id=""
              />
              <input
                type="text"
                placeholder="Enter Demo URl"
                className="form-control mb-3"
                name=""
                id=""
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">SAVE</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProject;
