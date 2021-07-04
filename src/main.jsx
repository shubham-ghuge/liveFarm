import React from "react";
import ReactDOM from "react-dom";
import DataContextProvider from "./contexts/DataContextProvider";
import App from "./components/App/App";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
