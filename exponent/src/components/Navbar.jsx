import logo from "../assets/Group z.svg";
import lighlogo from "../assets/light logo.svg";
import CurBalance from "../components/CurBalance";

const Navbar = () => {
  return (
    <div className="flex justify-between px-8 p-2 bg-stone-900">
      <img src={lighlogo} alt="" />
      <div className="flex gap-8">
        <CurBalance />
      </div>
    </div>
  );
};

export default Navbar;
