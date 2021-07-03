import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  if (token) {
    setDefaultHeaderToken(token);
  }
  const [loading, setLoading] = useState(false);
  async function loginWithCredentials(email, password) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://live-farm.herokuapp.com/users/login",
        { email, password }
      );
      if (data.success) {
        setToken(data.token);
        setUserDetails({ isUserLoggedIn: true, name: data.userName });
        localStorage.setItem("token", JSON.stringify({ token: data.token }));
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            isUserLoggedIn: true,
            name: data.userName,
          })
        );
        setDefaultHeaderToken(data.token);
      }
      return data.message;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  function setDefaultHeaderToken(token) {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    axios.defaults.headers.common["Authorization"] = null;
  }
  function logout() {
    setDefaultHeaderToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    setToken(null);
    setUserDetails(null);
  }
  axios.interceptors.response.use(undefined, function (error) {
    if (error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  });
  return (
    <AuthContext.Provider
      value={{ loading, token, userDetails, logout, loginWithCredentials }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuthContext = () => useContext(AuthContext);
