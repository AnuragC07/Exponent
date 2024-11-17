import { useState } from "react";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/andrew-neel-ADjcacMLblo-unsplash.jpg";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/signup",
        formData
      );
      if (response.data.token) {
        // Store the token in local storage upon successful login
        localStorage.setItem("jwtToken", response.data.token);
        // Redirect to home page upon successful login
        console.log("Registration Successfull!");
        navigate("/");
      } else {
        console.log(response.data.error); // Display error message if login fails
      }
      console.log(response.data);
      // navigate("/");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div>
      <img src={logo} alt="Exponent logo" className="m-5 absolute top-0" />
      <div className="flex h-screen font-new">
        <div
          id="body"
          className="flex flex-col justify-center items-center w-1/2"
        >
          <form
            className="w-3/4 bg-white rounded-xl lg:w-2/3 m-5 mt-10 flex flex-col gap-1 lg:gap-3 p-8 lg:p-10 pl-11"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col ">
              <label className="text-base text-stone-400 font-medium">
                Username
              </label>
              <input
                type="text"
                className=" w-full border border-stone-400 rounded-lg h-12 pl-3 font-semibold mt-1 text-base placeholder:text-base placeholder:font-normal"
                placeholder="John Doe"
                required
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-base text-stone-400 font-medium">
                Email
              </label>
              <input
                type="text"
                className=" w-full border border-stone-400 rounded-lg h-12 pl-3 font-semibold mt-1 text-base placeholder:text-base placeholder:font-normal"
                placeholder="abc@gmail.com"
                required
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-base text-stone-400 font-medium">
                Password
              </label>
              <input
                type="password"
                className=" w-full border border-stone-400 rounded-lg h-12 pl-3 font-semibold mt-1 text-base placeholder:text-base placeholder:font-normal"
                placeholder="Password"
                required
                name="password"
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                className="bg-green-800 text-white h-10 text-base p-1 w-full mt-6 lg:mt-10 rounded-md font-subtitle font-medium"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>

          <div>
            <h1 className="text-lg text-stone-600 font-subtitle font-semibold">
              already an user?{" "}
              <Link
                to="/login"
                className="text-lg text-green-600 font-subtitle font-semibold"
              >
                Login
              </Link>
            </h1>
          </div>
        </div>

        <div className="w-1/2">
          <img
            src={bg}
            alt="Background Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
