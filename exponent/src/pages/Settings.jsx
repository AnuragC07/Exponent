import LeftBar from "../components/LeftBar";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login"); // Redirect to the login page or any other page
  };

  return (
    <div className="bg-stone-950">
      <div className="flex justify-center mr-20">
        <Navbar />
      </div>
      <div className="flex h-full bg-stone-950">
        <LeftBar />
        <section className="mt-4 p-8 w-2/3 h-72 bg-stone-950 border border-stone-900 shadow-md rounded-2xl">
          <div>
            <h1 className="text-2xl text-stone-200 mb-8">Settings</h1>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Edit Currency ie. $"
                className="w-48 rounded-md h-12 px-4 bg-stone-800 text-white placeholder:text-stone-500"
              />
              <button className="rounded-lg px-4 p-1 h-12 bg-stone-900 text-white">
                Update Currency Type
              </button>
            </div>
            <button
              className="rounded-lg px-4 p-1 h-10 mt-20 text-stone-400 bg-stone-800 hover:bg-stone-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
