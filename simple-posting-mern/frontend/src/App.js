import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import User from "./pages/User/User";
import UserPlaces from "./pages/User/UserPlaces";
import NewPlace from "./pages/Place/NewPlace";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navigation>
        <Routes>
          <Route path="/" element={<User />} exact />
          <Route path="/:userId/places" element={<UserPlaces />} exact />
          <Route path="/places/new" element={<NewPlace />} exact />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Navigation>
    </BrowserRouter>
  );
}

export default App;
