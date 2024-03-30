import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Memoize the auth object using useMemo
  const { auth } = useSelector((state) => ({ ...state }));

  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
