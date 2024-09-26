import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.svg";
import bg from "../assets/andrew-neel-ADjcacMLblo-unsplash.jpg";

const Login = () => {
  

  return (
    <div>
      {/* <img src={logo} alt="beetle logo" className="m-5 absolute right-32 " /> */}
      <div className="flex h-screen">
        {/* Image Section */}
        <div className="w-1/2">
          <img
            src={bg}
            alt="Background Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div id="body" className="flex flex-col justify-center items-center w-1/2">
        <img src={logo} alt="Exponent logo" className="m-5 absolute top-0" />
        {/* <h1 className="text-2xl text-stone-500 font-semibold font-heading">Welcome Back</h1> */}
          <form
            className="w-3/4 bg-white rounded-xl lg:w-2/3 m-5 mt-10 flex flex-col gap-1 lg:gap-3 p-8 lg:p-10 pl-11"

          >
            <div className="flex flex-col">
              <label className="text-base text-stone-400 font-medium">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-stone-400 rounded-lg h-12 pl-3 font-semibold mt-1 text-base placeholder:text-base placeholder:font-normal"
                placeholder="abc@gmail.com"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-base text-stone-400 font-medium">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-stone-400 rounded-lg h-12 pl-3 font-semibold mt-1 text-base placeholder:text-base placeholder:font-normal"
                placeholder="Password"
                required
              />
            </div>
            <div>
              <button
                className="bg-green-800 text-white h-10 text-base p-1 w-full mt-6 lg:mt-10 rounded-md font-subtitle font-medium"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>

          <div>
            <h1 className="text-base text-stone-600 font-subtitle font-semibold">
              New here?{" "}
              <Link
                to="/register"
                className="text-base text-green-600 font-subtitle font-semibold"
              >
                Sign up
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
