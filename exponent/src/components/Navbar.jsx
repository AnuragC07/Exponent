import CurBalance from "../components/CurBalance";
import logo from "../assets/all light logo full.svg";
const Navbar = () => {
  return (
    <div className="flex justify-between px-16 py-2 mt-4 bg-stone-900 font-new w-3/5 rounded-2xl">
      <img src={logo} alt="" />
      <div className="flex gap-8">
        <CurBalance />
      </div>
    </div>
  );
};

export default Navbar;
