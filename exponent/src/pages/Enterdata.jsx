import React, { useState } from "react";
import logo from "../assets/alllightlogo.svg";
import axios from "axios";

const Enterdata = () => {
  const [amount, setAmount] = useState(0);

  const handleAmount = async (e) => {
    e.preventDefault();

    // Convert amount to number and validate
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount)) {
      console.error("Invalid amount");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");

      // Simply send the amount - the backend will extract username from token
      const response = await axios.post(
        "http://localhost:8000/api/total",
        { amount: numAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Amount listing success:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-950 flex flex-col gap-8 items-center justify-center z-50">
      <img src={logo} alt="" />
      <div className="bg-stone-900 rounded-lg shadow-lg p-6 w-full max-w-md">
        <form>
          <div className="mb-4">
            <label
              className="block text-stone-600 text-sm font-semibold mb-2 ml-4"
              htmlFor="curbalance"
            >
              Set your Current Balance
            </label>
            <input
              type="text"
              id="curbalance"
              placeholder="Enter Current Balance Amount"
              className="rounded-lg h-10 w-full px-4 m-2 bg-stone-800 text-stone-200 placeholder:text-stone-500"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 focus:outline-none"
              onClick={handleAmount}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Enterdata;
