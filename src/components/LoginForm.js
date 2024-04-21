import { GoogleLogin } from "react-google-login";

const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  clientId,
  onSuccess,
  onFailure,
}) => (
  <form onSubmit={handleSubmit} className="mt-3">
    <div className="form-group mb-3">
      <label className="form-label">Email address</label>
      <input
        type="email"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="form-group mb-3">
      <label className="form-label">Password</label>
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <div className="d-flex justify-content-between align-items-center mb-3">
      <button disabled={!email || !password} className="btn btn-primary">
        Submit
      </button>
      <div id="signInButton">
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      </div>
    </div>
  </form>
);

export default LoginForm;
