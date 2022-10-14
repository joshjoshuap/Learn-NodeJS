import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "../../components/Button";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
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

      navigate("/"); // redirect to login if signup success
      setIsLoading(false);
      auth.login(data.user.id); // set logged in session
    } catch (err) {
      console.log("Login Failed", err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="center">
      <h1>Login</h1>
      {isLoading && <h2>Logging In .....</h2>}
      {<h4>{error}</h4>}
      <form className="place-form" onSubmit={formSubmitHandler}>
        <div className="input-form">
          <label className="input-label" htmlFor="inputEmail">
            Email
          </label>
          <input
            className="input-type"
            type="email"
            id="inputEmail"
            name="inputEmail"
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
