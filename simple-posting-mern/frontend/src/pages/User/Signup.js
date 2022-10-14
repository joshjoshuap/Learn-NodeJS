import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import Button from "../../components/Button";

const Signup = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const nameChangeHandler = (event) => {
    setInputName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setInputEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setInputPassword(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: inputName,
          email: inputEmail,
          password: inputPassword,
        }),
      });

      const data = await res.json();

      // if response is not ok or fetch failed
      if (!res.ok) {
        setIsLoading(false);
        throw new Error(data.message);
      }

      navigate("/login"); // redirect to login if signup success
      setIsLoading(false);
      auth.login(data.user.id); // set logged session and id using context
    } catch (err) {
      console.log("Signup Failed", err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="center">
      <h1>Signup</h1>
      {isLoading && <h2>Register you account please wait. Loading</h2>}
      {<h3>{error}</h3>}
      <form className="place-form" onSubmit={formSubmitHandler}>
        <div className="input-form">
          <label className="input-label" htmlFor="inputName">
            Name
          </label>
          <input
            className="input-type"
            type="text"
            id="inputName"
            name="inputName"
            onChange={nameChangeHandler}
            value={inputName}
            placeholder="Enter Name"
          />
        </div>
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
        <Button type="submit" name="Register" />
      </form>
    </div>
  );
};

export default Signup;
