import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";

const TopNav = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");

    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      // Successfully signed out
      // Clear authentication state
      auth2.disconnect();
    }).catch((error) => {
      console.error('Sign out error:', error);
    });

    navigate("/login");
  };

  return (
    <div className="nav bg-light d-flex justify-content-between">
      {/* <Scanner /> */}
      <Link className="nav-link" to="/">
        Home
      </Link>

      {auth !== null && (
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      )}

      {auth !== null && auth.user.stripe_account_id !== undefined && (
        <Link className="nav-link" to="/qr-code">
          Scan QR Code
        </Link>
      )}

      {auth !== null && (
        <a className="nav-link pointer" onClick={logout}>
          Logout
        </a>
      )}

      {auth === null && (
        <>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default TopNav;
