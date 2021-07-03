import { StrictMode } from "react";
import ReactDOM from "react-dom";
import DataContextProvider from "./contexts/DataContextProvider";
import App from "./components/App/App";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContextProvider";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthContextProvider>
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </AuthContextProvider>
    </Router>
  </StrictMode>,
  rootElement
);
