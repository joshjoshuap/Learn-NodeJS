import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import User from "./user/pages/User";
import NewPlace from "./places/pages/NewPlace";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />} exact />
        <Route path="/places/new" element={<NewPlace />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
