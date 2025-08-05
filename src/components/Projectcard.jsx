import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import base_url from "../Services/base_url";

function Projectcard({ project, onDelete, children }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card
        className="border-0 rounded-4"
        style={{
          width: "100%",
          cursor: "pointer",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#fff",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-5px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(0px)")
        }
      >
        <Card.Img
          onClick={handleShow}
          variant="top"
          src={
            project.image
              ? `${base_url}/projectimg/${project.image}`
              : "https://via.placeholder.com/400x300?text=No+Image"
          }
          style={{
            borderRadius: "0.75rem 0.75rem 0 0",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <Card.Body onClick={handleShow}>
          <Card.Title className="fw-semibold text-white text-truncate">
            {project.title}
          </Card.Title>
        </Card.Body>

        {children && (
          <div className="p-3 d-flex justify-content-between align-items-center">
            {children}
            {onDelete && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(project._id)}
              >
                Delete
              </Button>
            )}
          </div>
        )}
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          className="border-0 pb-1"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            color: "#fff",
          }}
        >
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            color: "#fff",
          }}
          className="rounded-0 px-4 pt-3"
        >
          <div className="row flex-column flex-md-row g-3">
            <div className="col-md-6">
              <img
                src={
                  project.image
                    ? `${base_url}/projectimg/${project.image}`
                    : "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt="project"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h4 className="fw-bold">{project.title}</h4>
              <p>
                <span className="fw-semibold">Description:</span>{" "}
                {project.description}
              </p>
              <p>
                <span className="fw-semibold">Languages:</span>{" "}
                {project.language}
              </p>
              <div className="d-flex gap-3 mt-2">
                {project.gitrepo && (
                  <a
                    href={project.gitrepo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-info"
                    style={{ fontSize: "1.2rem" }}
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-info"
                    style={{ fontSize: "1.2rem" }}
                  >
                    <i className="fa-solid fa-link"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer
          className="border-0 pt-0"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Button variant="outline-light" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Projectcard;
