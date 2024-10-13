import axios from "axios";
import { useEffect, useState } from "react";

const MonthlyBudget = () => {
  const [fetchedAmount, setFetchedAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [month, setMonth] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/budget")
      .then((response) => {
        setFetchedAmount(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Axios Error:", error);
      });
  }, []);

  const handleBudgetSubmit = () => {
    const data = {
      amount,
      month,
    };
    axios
      .post("http://localhost:8000/budget", data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("Error occurred! Please fill out all fields. ", error);
      });
  };

  return (
    <div className="flex flex-row justify-between mt-8">
      <div className="">
        <h1 className="text-3xl text-green-600 font-semibold"> {amount}</h1>
        <p className="text-sm text-stone-400 mt-1">{month} Monthly Budget</p>
      </div>
      <div>
        <select
          className="rounded-lg h-10 w-48 px-4 m-2 cursor-pointer bg-stone-800 text-stone-200 placeholder:text-stone-500"
          onChange={(e) => setMonth(e.target.value)}
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
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Update Budget"
          className="rounded-lg h-10 w-56 px-4 m-2 bg-stone-800 text-stone-200 placeholder:text-stone-500"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="rounded-lg bg-stone-700 px-4 p-1 h-10 text-white"
          onClick={handleBudgetSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default MonthlyBudget;
