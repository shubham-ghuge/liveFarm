import React, { useEffect, useState } from "react";
import channelIcon from "../../assets/photo1.png";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useAuthContext } from "../../contexts/AuthContextProvider";
import axios from "axios";
import { useNavigate } from "react-router";

export function Account() {
  const { userDetails, logout } = useAuthContext();
  const { name } = userDetails || {};
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "" });
  async function getUserData() {
    try {
      const { data } = await axios.get(
        "https://live-farm.herokuapp.com/users/"
      );
      if (data.success) {
        setUserData(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log('here');
    name && getUserData();
  }, []);
  return (
    <section className="user-account nav-adjust">
      <h3>Profile</h3>
      <div className="user-info">
        <img src={channelIcon} className="channel-icon" alt="User" />
        <h2 className="heading">{name}</h2>
      </div>
      <div>
        <div className="input-livefarm mb-7">
          <input type="URL" value={userData.name} required  readOnly />
        </div>
        <div className="input-livefarm mb-7">
          <input type="text" value={userData.email} required readOnly />
        </div>
        <button
          className="icon-btn-base p-7 d-flex ai-center"
          onClick={() => {
            logout();
            return navigate("/");
          }}
        >
          <span>
            <AiOutlineCloudUpload className="icon mr-3" />
          </span>
          Logout
        </button>
      </div>
    </section>
  );
}
