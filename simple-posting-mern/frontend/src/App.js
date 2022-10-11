import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./shared/components/navigation/Navigation";
import User from "./user/pages/User";
import NewPlace from "./places/pages/NewPlace";
import "./App.css";
import UserPlaces from "./places/pages/UserPlaces";

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
