import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Login from "./pages/Login";


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
        
  )
}

export default App