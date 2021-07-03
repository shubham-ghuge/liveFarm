import { Navigate, Route } from "react-router";

function PrivateRoute({ path, ...props }) {
  return true ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate to="/login" state={{ from: path }} replace />
  );
}
export { PrivateRoute };
