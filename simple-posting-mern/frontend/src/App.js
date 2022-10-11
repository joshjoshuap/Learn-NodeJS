import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import User from "./pages/User/User";
import UserPlaces from "./pages/User/UserPlaces";
import AddPlace from "./pages/Place/AddPlace";
import "./App.css";
import EditPlace from "./pages/Place/EdiitPlace";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";

function App() {
  return (
    <BrowserRouter>
      <Navigation>
        <Routes>
          <Route path="/" element={<User />} exact />
          <Route path="/:userId/places" element={<UserPlaces />} exact />
          <Route path="/places/new" element={<AddPlace />} exact />
          <Route path="/places/:placeId" element={<EditPlace />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/signup" element={<Signup />} exact />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Navigation>
    </BrowserRouter>
  );
}

export default App;
