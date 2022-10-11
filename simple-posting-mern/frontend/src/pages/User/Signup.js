import { useState } from "react";
import Button from "../../components/Button";

const Signup = () => {
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
    console.log(inputEmail, inputPassword);
  };

  return (
    <div className="center">
      <h1>Signup</h1>
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
        <Button type="submit" name="Register" />
      </form>
    </div>
  );
};

export default Signup;
