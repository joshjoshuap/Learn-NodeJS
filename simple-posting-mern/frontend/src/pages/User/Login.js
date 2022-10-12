import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "../../components/Button";

const Login = () => {
  const auth = useContext(AuthContext);

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const emailChangeHandler = (event) => {
    setInputEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setInputPassword(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    auth.login();
  };

  return (
    <div className="center">
      <h1>Login</h1>
      <form className="place-form" onSubmit={formSubmitHandler}>
        <div className="input-form">
          <label className="input-label" htmlFor="imputEmail">
            Email
          </label>
          <input
            className="input-type"
            type="email"
            id="imputEmail"
            name="imputEmail"
            onChange={emailChangeHandler}
            value={inputEmail}
            placeholder="Enter Email"
          />
        </div>
        <div className="input-form">
          <label className="input-label" htmlFor="inputPassword">
            Password
          </label>
          <input
            className="input-type"
            type="password"
            id="inputPassword"
            name="inputPassword"
            onChange={passwordChangeHandler}
            value={inputPassword}
            placeholder="Enter Password"
          />
        </div>
        <Button type="submit" name="Login" />
        <Link to="/signup">Not Registered? Sign Up Here</Link>
      </form>
    </div>
  );
};

export default Login;
