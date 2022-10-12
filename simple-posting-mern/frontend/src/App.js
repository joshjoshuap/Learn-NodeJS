import { useState, useCallback, Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import Navigation from "./components/Navigation";
import User from "./pages/User/User";
import UserPlaces from "./pages/User/UserPlaces";
import AddPlace from "./pages/Place/AddPlace";
import "./App.css";
import EditPlace from "./pages/Place/EdiitPlace";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <>
        <Route path="/" element={<User />} exact />
        <Route path="/:userId/places" element={<UserPlaces />} exact />
        <Route path="/place/new" element={<AddPlace />} exact />
        <Route path="/places/:placeId" element={<EditPlace />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<User />} exact />
        <Route path="/:userId/places" element={<UserPlaces />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/signup" element={<Signup />} exact />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <BrowserRouter>
        <Navigation>
          <Routes>{routes}</Routes>
        </Navigation>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
