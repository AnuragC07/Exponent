import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FullAnalytics from "./pages/FullAnalytics";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/analytics" element={<FullAnalytics />} />
      </Routes>
        
  )
}

export default App