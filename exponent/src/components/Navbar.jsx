import logo from "../assets/Group z.svg";
import CurBalance from "../components/CurBalance";

const Navbar = () => {
  return (
    <div className="flex justify-between px-8 m-2">
      <img src={logo} alt="" />
      <div className="flex gap-8">
        <CurBalance />
      </div>
    </div>
  );
};

export default Navbar;
