import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { updateprofileApi } from "../Services/AllApi";
import { authContext } from "../ContextApi/ContextApi";
import { useNavigate } from "react-router-dom";
import base_url from "../Services/base_url";

function Profile() {
  const { setAuthStatus } = useContext(authContext);
  const nav = useNavigate();

  const [profileShow, setProfileShow] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    github: "",
    linkedin: "",
    profile: "",
  });
  const [preview, setPreview] = useState("");

  const togglerProfile = () => setProfileShow(!profileShow);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      setProfileData({ ...userData });
    }
  }, []);

  useEffect(() => {
    if (profileData.profile?.type) {
      setPreview(URL.createObjectURL(profileData.profile));
    } else {
      setPreview("");
    }
  }, [profileData.profile]);

  const handleEdit = async () => {
    const { username, github, linkedin, profile } = profileData;
    if (!username || !github || !linkedin || !profile) {
      return toast.error("Please fill all fields and select a profile image.");
    }

    const headers = {
      Authorization: `Token ${sessionStorage.getItem("token")}`,
      "Content-Type": profile?.type
        ? "multipart/form-data"
        : "application/json",
    };

    const response = await updateprofileApi(profileData, headers);

    if (response.status === 200) {
      toast.success("Profile updated successfully!");
      sessionStorage.clear();
      setAuthStatus(false);
      nav("/");
    } else {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div
      className="rounded-4 p-4"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        color: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
<div className="d-flex justify-content-between align-items-center mb-2">
  <h5 className="mb-0 text-light">Profile Settings</h5>
  <button
    className="btn btn-sm text-white border-0 shadow-none"
    onClick={togglerProfile}
    title="Toggle Profile"
  >
    <i
      className={`fa-solid ${
        profileShow ? "fa-toggle-on" : "fa-toggle-off"
      } fa-xl`}
    ></i>
  </button>
</div>


      {profileShow && (
        <div className="mt-3">
          <div className="text-center mb-3">
            <label htmlFor="pf" className="d-inline-block">
              <input
                id="pf"
                type="file"
                style={{ display: "none" }}
                onChange={(e) =>
                  setProfileData({ ...profileData, profile: e.target.files[0] })
                }
              />
              <img
                src={
                  preview
                    ? preview
                    : profileData.profile
                    ? `${base_url}/projectimg/${profileData.profile}`
                    : "https://www.iconpacks.net/icons/1/free-user-icon-972-thumb.png"
                }
                alt="avatar"
                className="rounded-circle shadow-lg"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: "2px solid #fff",
                }}
              />
            </label>
          </div>

          <input
            type="text"
            placeholder="Username"
            className="form-control mb-2 bg-light text-dark border-light"
            value={profileData.username}
            onChange={(e) =>
              setProfileData({ ...profileData, username: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="GitHub Link"
            className="form-control mb-2 bg-light text-dark border-light"
            value={profileData.github}
            onChange={(e) =>
              setProfileData({ ...profileData, github: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="LinkedIn Link"
            className="form-control mb-3 bg-light text-dark border-light"
            value={profileData.linkedin}
            onChange={(e) =>
              setProfileData({ ...profileData, linkedin: e.target.value })
            }
          />

          <div className="d-flex gap-3">
            <button
              className="btn btn-success btn-sm w-50 me-1"
              onClick={handleEdit}
            >
              Update
            </button>
            <button
              className="btn btn-outline-danger btn-sm w-50 ms-1"
              onClick={() => setProfileShow(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
