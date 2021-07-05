import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContextProvider";
import { Alert } from "../../Alert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  const { loading, loginWithCredentials } = useAuthContext();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    showPass: false,
  });
  let navigate = useNavigate();
  const [message, setMessage] = useState(null);
  async function userLogin(e) {
    e.preventDefault();
    const data = await loginWithCredentials(
      userInput.email,
      userInput.password
    );
    setMessage(data.message);
    if (data.success) {
      navigate("/", { replace: true });
    }
  }
  return (
    <>
      {message && <Alert message={message} onClose={() => setMessage(null)} />}
      <h3 className="heading">Login</h3>
      <form onSubmit={(event) => userLogin(event)}>
        <div className="input-livefarm mb-7">
          <input
            type="email"
            value={userInput.email}
            onChange={(e) =>
              setUserInput((curr) => ({ ...curr, email: e.target.value }))
            }
            required
          />
          <label data-error="This field is required">Enter Email Id</label>
        </div>
        <div className="input-livefarm mb-7">
          <input
            type={userInput.showPass ? "text" : "password"}
            value={userInput.password}
            onChange={(e) =>
              setUserInput((curr) => ({ ...curr, password: e.target.value }))
            }
            required
          />
          <button
            className="btn-reset icon c-theme"
            type="button"
            onClick={() => {
              setUserInput((curr) => ({ ...curr, showPass: !curr.showPass }));
            }}
          >
            {userInput.showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
          </button>
          <label data-error="This field is required">Enter Password</label>
        </div>
        <button type="submit" className="btn-primary">
          {loading ? "loggin in..." : "login"}
        </button>
      </form>
      <p className="mt-4">
        New Here? <Link to="/auth/register">Register Now</Link>
      </p>
      <button
        className="btn-reset c-primary mt-4 text-capitalize fw-500"
        onClick={() =>
          setUserInput((curr) => ({
            ...curr,
            email: "shubhamghuge@gmail.com",
            password: "aaaaaa",
          }))
        }
      >
        demo login credentials
      </button>
    </>
  );
}
export { Login };
