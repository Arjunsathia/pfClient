import React, { use, useState, useEffect, useContext } from "react";
import { Nav } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateprofileApi } from "../Services/AllApi";
import { authContext } from "../ContextApi/ContextApi";
import { useNavigate } from "react-router-dom";
import base_url from "../Services/base_url";

function Profile() {
  const { setAuthStatus } = useContext(authContext);
  const nav = useNavigate();

  const [profileShow, setProfileShow] = useState(false);
  const togglerProfile = () => {
    setProfileShow(!profileShow);
  };
  const [profileData, setProfileData] = useState({
    username: "",
    github: "",
    linkedin: "",
    profile: "",
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("userData")) {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      setProfileData({ ...userData });
    }
  }, []);

  useEffect(() => {
    if (profileData.profile.type) {
      setPreview(URL.createObjectURL(profileData.profile));
    } else {
      setPreview("");
    }
  }, [profileData.profile.type]);

  const handleEdit = async () => {
    console.log(profileData);
    const { username, github, linkedin, profile } = profileData;
    if (!username || !github || !linkedin || !profile) {
      toast.error("Please fill all fields and select a profile image.");
    } else {
      let header = {};
      if (profile.type) {
        header = {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        };
      } else {
        header = {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        };
      }
      // Call your API to update the profile here
      const response = await updateprofileApi(profileData, header);
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        nav("/");
        sessionStorage.clear();
        setAuthStatus(false);
      } else {
        toast.error("Failed to update profile");
        console.log(response);
      }
    }
  };
  return (
    <>
      <div className="container-fluid border border-2 border-info p-3">
        <div className="d-flex justify-content-between">
          <h3>Profile</h3>
          <button className="btn border-0" onClick={togglerProfile}>
            {profileShow ? (
              <i className="fa-solid fa-toggle-on fa-xl "></i>
            ) : (
              <i className="fa-solid fa-toggle-off fa-xl "></i>
            )}
          </button>
        </div>
        {profileShow && (
          <div className="w-100">
            <div>
              <label htmlFor="pf" className="d-flex justify-content-between">
                <input
                  onChange={(e) => {
                    setProfileData({
                      ...profileData,
                      profile: e.target.files[0],
                    });
                  }}
                  type="file"
                  name=""
                  id="pf"
                  style={{ display: "none" }}
                />
                <img
                  src={
                    preview
                      ? preview
                      : profileData.profile
                      ? `${base_url}/projectimg/${profileData.profile}`
                      : "https://www.iconpacks.net/icons/1/free-user-icon-972-thumb.png"
                  }
                  alt=""
                  className="img-fluid"
                />
              </label>
              <input
                onChange={(e) => {
                  setProfileData({
                    ...profileData,
                    username: e.target.value,
                  });
                }}
                type="text"
                placeholder="Username"
                className="my-3 form-control"
                defaultValue={profileData.username}
              />
              <input
                onChange={(e) => {
                  setProfileData({
                    ...profileData,
                    github: e.target.value,
                  });
                }}
                type="text"
                placeholder="Git Link"
                className="my-3 form-control"
                defaultValue={profileData.github}
              />
              <input
                onChange={(e) => {
                  setProfileData({
                    ...profileData,
                    linkedin: e.target.value,
                  });
                }}
                type="text"
                placeholder="LinkdIn"
                className="my-3 form-control"
                defaultValue={profileData.linkedin}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-success" onClick={handleEdit}>
                Update
              </button>
              <button className="btn btn-danger">cancel / close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
