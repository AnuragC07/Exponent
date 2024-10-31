import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../assets/logo.svg";
import bg from "../assets/andrew-neel-ADjcacMLblo-unsplash.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to get JWT token from local storage
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  // Create an Axios instance with default configuration
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000", // Your server base URL
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor to attach JWT token to all requests
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in..."); // Show loading toast
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });
      if (response.data.token) {
        // Store the token in local storage upon successful login
        localStorage.setItem("jwtToken", response.data.token);
        // Redirect to home page upon successful login
        console.log("Login Successfull!");
        navigate("/home");
      } else {
        console.log(response.data.error); // Display error message if login fails
      }
    } catch (error) {
      console.error("Login Error:", error);
      console.log("Invalid Email or Password! Please try again.");
    }
  };

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
        <div
          id="body"
          className="flex flex-col justify-center items-center w-1/2"
        >
          <img src={logo} alt="Exponent logo" className="m-5 absolute top-0" />
          {/* <h1 className="text-2xl text-stone-500 font-semibold font-heading">Welcome Back</h1> */}
          <form
            className="w-3/4 bg-white rounded-xl lg:w-2/3 m-5 mt-10 flex flex-col gap-1 lg:gap-3 p-8 lg:p-10 pl-11"
            onSubmit={handleSubmit}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
