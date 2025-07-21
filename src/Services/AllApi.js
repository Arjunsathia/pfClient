// import { addProject } from "../../../pfExpress/Controllers/ProjectController";
import base_url from "./base_url";
import CommonApi from "./CommonApi";

const RegUserApi = async (data) => {
  return await CommonApi(`${base_url}/reg`, "POST", "", data);
};

const LogUserApi = async (data) => {
  return await CommonApi(`${base_url}/login`, "POST", "", data);
};

export const AddProjectApi = async (data) => {
  const header = {
    Authorization: `Token ${sessionStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  };
  return await CommonApi(`${base_url}/AddProject`, "POST", header, data);
};

export const userProjectApi = async () => {
  const header = {
    Authorization: `Token ${sessionStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  };
  return await CommonApi(`${base_url}/userProjects`, "GET", header, "");
};

export const deleteProjectApi = async (id) => {
  const header = {
    Authorization: `Token ${sessionStorage.getItem(`token`)}`,
    "Content-Type": "application/json",
  };
  return await CommonApi(
    `${base_url}/deleteproject/${id}`,
    "DELETE",
    header,
    {}
  );
};

export const editProjectApi = async (id, data, header) => {
  return await CommonApi(`${base_url}/editproject/${id}`, "PUT", header, data);
};

export { RegUserApi, LogUserApi };

export const updateprofileApi = async (data, header) => {
  return await CommonApi(`${base_url}/updateprofile`, "PUT", header, data);
};

export const allProjecsApi = async () => {
  return await CommonApi(`${base_url}/allProjects`, "GET", "", ""); 
}