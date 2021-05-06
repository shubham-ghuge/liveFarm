import { StrictMode } from "react";
import ReactDOM from "react-dom";
import DataContextProvider from "./contexts/DataContextProvider";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </Router>
  </StrictMode>,
  rootElement
);
