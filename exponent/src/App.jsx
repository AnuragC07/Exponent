import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FullAnalytics from "./pages/FullAnalytics";
import Landing from "./pages/Landing";
import Enterdata from "./pages/Enterdata";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/enterdata" element={<Enterdata />} />
      <Route path="/home" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/analytics" element={<FullAnalytics />} />
    </Routes>
  );
};

export default App;
