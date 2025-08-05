import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { AddProjectApi } from "../Services/AllApi";
import { addResponseContext } from "../ContextApi/ContextApi";

function AddProject() {
  const [show, setShow] = useState(false);
  const [project, setProject] = useState({
    title: "",
    description: "",
    language: "",
    gitRepo: "",
    demo: "",
    image: "",
  });

  const [preview, setPreview] = useState("");
  const { setAddResponse } = useContext(addResponseContext);

  useEffect(() => {
    if (project.image) {
      setPreview(URL.createObjectURL(project.image));
    } else {
      setPreview("");
    }
  }, [project.image]);

  const handleSubmit = async () => {
    const { title, description, language, gitRepo, demo, image } = project;
    if (!title || !description || !language || !gitRepo || !demo || !image) {
      toast.warning("Please fill all fields");
    } else {
      const response = await AddProjectApi(project);
      if (response.status === 200) {
        toast.success("Project Added Successfully");
        setProject({
          title: "",
          description: "",
          language: "",
          gitRepo: "",
          demo: "",
          image: "",
        });
        setPreview("");
        setAddResponse(response);
        handleClose();
      } else {
        toast.error("Project addition failed");
      }
    }
  };

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
        centered
        contentClassName="bg-dark text-white rounded-4 border border-light shadow"
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="text-warning">Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row g-3">
            <div className="col-md-4 text-center">
              <label htmlFor="ff" className="d-block cursor-pointer">
                <input
                  type="file"
                  id="ff"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setProject({ ...project, image: e.target.files[0] })
                  }
                />
                <img
                  src={
                    preview
                      ? preview
                      : "https://static.thenounproject.com/png/187803-200.png"
                  }
                  alt="preview"
                  className="img-fluid rounded shadow"
                  style={{
                    width: "100%",
                    maxHeight: "180px",
                    objectFit: "cover",
                    cursor: "pointer",
                    border: "1px solid #fff",
                  }}
                />
              </label>
            </div>

            <div className="col-md-8">
              <input
                type="text"
                placeholder="Enter Title"
                className="form-control mb-2 bg-dark text-white border-light"
                value={project.title}
                onChange={(e) =>
                  setProject({ ...project, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Enter Description"
                className="form-control mb-2 bg-dark text-white border-light"
                value={project.description}
                onChange={(e) =>
                  setProject({ ...project, description: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Enter Language"
                className="form-control mb-2 bg-dark text-white border-light"
                value={project.language}
                onChange={(e) =>
                  setProject({ ...project, language: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="GitHub Repo URL"
                className="form-control mb-2 bg-dark text-white border-light"
                value={project.gitRepo}
                onChange={(e) =>
                  setProject({ ...project, gitRepo: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Demo URL"
                className="form-control bg-dark text-white border-light"
                value={project.demo}
                onChange={(e) =>
                  setProject({ ...project, demo: e.target.value })
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="outline-light" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProject;
