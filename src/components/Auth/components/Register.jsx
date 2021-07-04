import React from "react";
import axios from "axios";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Alert } from "../../Alert";

function Register() {
  const [inputDetails, setInputDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPass: true,
    showConfirmPass: true,
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  async function userRegistration(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://live-farm.herokuapp.com/users/register",
        {
          name: inputDetails.name,
          email: inputDetails.email,
          password: inputDetails.password,
        }
      );
      if (data.success) {
        ["liked videos", "saved videos", "watch later"].map(
          async (i) => await setPlaylists(data.token, i)
        );
      }
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function setPlaylists(token, playlistName) {
    try {
      const response = await axios.post(
        "https://live-farm.herokuapp.com/playlists",
        {
          name: playlistName,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {message && <Alert message={message} onClose={() => setMessage(null)} />}
      <h3 className="heading">Register</h3>
      <form onSubmit={(e) => userRegistration(e)}>
        <div className="mb-7">
          <div className="input-livefarm">
            <input
              type="text"
              value={inputDetails.name}
              onChange={(e) =>
                setInputDetails((curr) => ({ ...curr, name: e.target.value }))
              }
              required
            />
            <label data-error={"This field is required"}>Enter Name</label>
          </div>
          <p className="c-danger text-sm fw-500">
            {inputDetails.name.length !== 0 &&
              inputDetails.name.length < 2 &&
              "Name must be atleast 2 characters"}
          </p>
        </div>
        <div className="mb-7">
          <div className="input-livefarm">
            <input
              type="email"
              value={inputDetails.email}
              onChange={(e) =>
                setInputDetails((curr) => ({ ...curr, email: e.target.value }))
              }
              required
            />
            <label data-error="This field is required">Enter Email Id</label>
          </div>
        </div>
        <div className="mb-7">
          <div className="input-livefarm">
            <input
              type={inputDetails.showPass ? "password" : "text"}
              value={inputDetails.password}
              onChange={(e) =>
                setInputDetails((curr) => ({
                  ...curr,
                  password: e.target.value,
                }))
              }
              required
            />
            <button
              className="btn-reset icon c-theme"
              type="button"
              onClick={() => {
                setInputDetails((curr) => ({
                  ...curr,
                  showPass: !curr.showPass,
                }));
              }}
            >
              {inputDetails.showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
            <label data-error="This field is required">Enter Password</label>
          </div>
          <p className="c-danger text-sm fw-500">
            {inputDetails.password.length !== 0 &&
              inputDetails.password.length < 6 &&
              "Password must be at least 6 characters"}
          </p>
        </div>
        <div className="mb-7">
          <div className="input-livefarm">
            <input
              type={inputDetails.showConfirmPass ? "password" : "text"}
              value={inputDetails.confirmPassword}
              onChange={(e) =>
                setInputDetails((curr) => ({
                  ...curr,
                  confirmPassword: e.target.value,
                }))
              }
              required
            />
            <button
              className="btn-reset icon c-theme"
              type="button"
              onClick={() => {
                setInputDetails((curr) => ({
                  ...curr,
                  showConfirmPass: !curr.showConfirmPass,
                }));
              }}
            >
              {inputDetails.showConfirmPass ? (
                <AiFillEyeInvisible />
              ) : (
                <AiFillEye />
              )}
            </button>
            <label data-error="This field is required">
              Enter Confirm Password
            </label>
          </div>
          <p className="c-danger text-sm fw-500">
            {inputDetails.confirmPassword.length !== 0 &&
              inputDetails.password !== inputDetails.confirmPassword &&
              "Passwords Does not match"}
          </p>
        </div>
        <button className="btn-primary">
          {loading ? "loading..." : "Register"}
        </button>
      </form>
      <p className="mt-4">
        Already a user? <Link to="/auth">Login</Link>
      </p>
    </>
  );
}
export { Register };
