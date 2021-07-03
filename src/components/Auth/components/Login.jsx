import { useState } from "react";
import { Link } from "react-router-dom";
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
  const [message, setMessage] = useState(null);
  async function userLogin(e) {
    e.preventDefault();
    const message = await loginWithCredentials(
      userInput.email,
      userInput.password
    );
    setMessage(message);
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
            type={userInput.showPass ? "password" : "text"}
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
            {userInput.showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
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
    </>
  );
}
export { Login };
