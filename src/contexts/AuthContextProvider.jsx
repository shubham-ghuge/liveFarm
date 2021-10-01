import React from "react";
import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
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
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            isUserLoggedIn: true,
            name: data.userName,
          })
        );
        axios.defaults.headers.common["Authorization"] = data.token;
      }
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    axios.defaults.headers.common["Authorization"] = null;
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
