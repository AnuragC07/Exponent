import React from "react";
import logo from "../assets/alllightlogo.svg";
import { useEffect, useState } from "react";
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
      const response = await axios.post("http://localhost:8000/api/total", {
        amount: numAmount, // Send the converted number
      });
      console.log("Amount listing success:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-950  flex flex-col gap-8 items-center justify-center z-50">
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
          {/* <div className="mb-4">
            <label
              className="block text-stone-600 text-sm font-semibold mb-2 ml-4"
              htmlFor="curbudget"
            >
              Set your current Budget
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Current Budget Amount"
                className="rounded-lg h-10 w-full px-4 m-2 bg-stone-800 text-stone-200 placeholder:text-stone-500"
                //   onChange={(e) => setSource(e.target.value)}
              />

              <select
                className="rounded-lg h-10 w-48 px-4 m-2 cursor-pointer bg-stone-800 text-stone-200 placeholder:text-stone-500"
                id="curbudget"

                // onChange={(e) => setMonth(e.target.value)}
              >
                <option
                  value="select"
                  className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1 text-stone-500 placeholder:text-stone-400"
                >
                  Select Month
                </option>
                <option
                  value="January"
                  className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                >
                  January
                </option>
                <option
                  value="February"
                  className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                >
                  February
                </option>
                <option
                  value="March"
                  className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                >
                  March
                </option>
                <option
                  value="April"
                  className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                >
                  April
                </option>
                <option
                  value="May"
                  className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                >
                  May
                </option>
                <option
                  value="June"
                  className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                >
                  June
                </option>
                <option
                  value="July"
                  className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                >
                  July
                </option>
                <option
                  value="August"
                  className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                >
                  August
                </option>
                <option
                  value="September"
                  className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                >
                  September
                </option>
                <option
                  value="October"
                  className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                >
                  October
                </option>
                <option
                  value="November"
                  className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                >
                  November
                </option>
                <option
                  value="December"
                  className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                >
                  December
                </option>
              </select>
            </div>
          </div> */}
          {/* <div className="mb-4">
            <label
              className="block text-stone-600 text-sm font-semibold mb-2 ml-4"
              htmlFor="currency"
            >
              Set your Currency
            </label>
            <input
              type="text"
              id="currency"
              placeholder="Enter Currency ie. $/₹"
              className="rounded-lg h-10 w-full px-4 m-2 bg-stone-800 text-stone-200 placeholder:text-stone-500"
              //   onChange={(e) => setSource(e.target.value)}
            />
          </div> */}
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
