import LeftBar from "../components/LeftBar";
import Navbar from "../components/Navbar";

const Settings = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <LeftBar />
        <section className="mt-10 p-8 w-2/4 h-72 border border-stone-200 rounded-2xl">
          <div>
            <h1 className="text-2xl text-stone-600 mb-8">Settings</h1>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Edit Currency ie. $"
                className="border rounded-lg h-10 w-48 px-4"
              />
              <button className="border rounded-lg bg-stone-600 px-4 p-1 h-10 text-white">
                Update Currency
              </button>
            </div>
            <button className="border rounded-lg px-4 p-1 h-10 mt-20 text-stone-400">
                Logout
              </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
