import React from "react";
import { Navigate, Route } from "react-router";
import { useAuthContext } from "../../../contexts/AuthContextProvider";

function PrivateRoute({ path, ...props }) {
  const { userDetails } = useAuthContext();
  const { isUserLoggedIn } = userDetails || {};
  return isUserLoggedIn ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate to="/auth" state={{ from: path }} replace />
  );
}
export { PrivateRoute };
