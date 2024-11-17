import React from "react";
import lightlogo from "../assets/logo.svg";
import bg from "../assets/philip-oroni-VfOGf5RWkeg-unsplash.jpg";
import { useNavigate, Link } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      {/* <img src={logo} alt="beetle logo" className="m-5 absolute right-32 " /> */}
      <div className="flex h-screen font-new">
        {/* Image Section */}
        <div className="w-1/2">
          <img
            src={bg}
            alt="Background Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div
          id="body"
          className="flex flex-col justify-center items-center w-1/2"
        >
          <img
            src={lightlogo}
            alt="Exponent logo"
            className="m-5 absolute top-0"
          />
          {/* <h1 className="text-2xl text-stone-500 font-semibold font-heading">Welcome Back</h1> */}
          <h1 className="text-3xl ">We make your money management Easier.</h1>
          <h2 className="text-lg mt-4 text-stone-400">
            All of your data securely stored so you can focus on what matters
          </h2>
          <button
            className="h-10 w-52 px-4 py-1 border bg-stone-800 text-white rounded-3xl mt-28"
            onClick={handleSubmit}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
