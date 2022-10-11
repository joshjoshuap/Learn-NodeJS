import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const emailChangeHandler = (event) => {
    setInputEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setInputPassword(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(inputEmail, inputPassword);
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
            Description
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
      </form>
      <Link to="/signup">Not Registered? Sign Up Here</Link>
    </div>
  );
};

export default Login;
