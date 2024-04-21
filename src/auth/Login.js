import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux"; // Importing dispatch
import { gapi } from "gapi-script";
import { checkIfUser } from "../actions/auth";
import { register } from "../actions/auth";

const clientId =
  "333547009193-qj0a2agritv0le2q1bd353qlj1csm2en.apps.googleusercontent.com";

const onSuccess = async (res, dispatch, navigate) => {
  // Passing dispatch and navigate as parameters
  console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
  function start() {
    gapi.client.init({
      clientId: clientId,
      scope: "",
    });
  }
  gapi.load("client:auth2", start);

  const { name, email, googleId } = res.profileObj;

  try {
    const password = googleId;

    let res = await checkIfUser({ email });
    if (res.status === 200) {
      let res1 = await login({ email, password });
      if (res1.data) {
        window.localStorage.setItem("auth", JSON.stringify(res1.data));
        //save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res1.data,
        });
        navigate("/dashboard");
      }
    } else if (res.status === 201) {
      await register({ name, email, password });
      let res3 = await login({ email, password });
      if (res3.data) {
        window.localStorage.setItem("auth", JSON.stringify(res3.data));
        //save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res3.data,
        });
        navigate("/dashboard");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const onFailure = (res) => {
  console.log("LOGIN FAILED! res: ", res);
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA", { email, password });
    try {
      let res = await login({ email, password });
      if (res.data) {
        console.log("SAVE USER RES IN REDUX AND STORAGE THEN REDIRECT ===> ");
        // console.log(res.data);
        //save user and token to local storage
        window.localStorage.setItem("auth", JSON.stringify(res.data));
        //save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) toast.error(error.response.data);
    }
  };
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Login</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              clientId={clientId}
              onSuccess={(res) => onSuccess(res, dispatch, navigate)} // Passing dispatch and navigate to onSuccess
              onfailure={onFailure}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
