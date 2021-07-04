import React from "react";
import channelIcon from "../../assets/photo1.png";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../../contexts/AuthContextProvider";

export function Account() {
  const { userDetails } = useAuthContext();
  const { name } = userDetails || {};
  return (
    <section className="user-account nav-adjust">
      <h3>Profile</h3>
      <div className="user-info">
        <img src={channelIcon} className="channel-icon" alt="User" />
        <h2 className="heading">{name}</h2>
      </div>
      <h3>Submit Video</h3>
      <form onSubmit={(evt) => submitVideo(evt)}>
        <div className="input-livefarm">
          <input type="URL" required />
          <label>Enter YT Video URL</label>
        </div>
        <div className="input-livefarm">
          <input type="text" required />
          <label data-error="This field is required">
            Enter Video Thumbnail
          </label>
        </div>
        <div className="input-livefarm">
          <input type="text" required />
          <label data-error="This field is required">Enter Video Title</label>
        </div>
        <button
          type="submit"
          className="icon-btn-base btn-addon"
          onClick={() => toast("Working on These!")}
        >
          <span>
            <AiOutlineCloudUpload className="icon" />
          </span>
          Submit
        </button>
      </form>
      <ToastContainer />
    </section>
  );
}
