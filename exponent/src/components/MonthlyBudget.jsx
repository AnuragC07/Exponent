import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs"; // Import Day.js

const MonthlyBudget = ({ currentMonth }) => {
  const [fetchedAmount, setFetchedAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [month, setMonth] = useState("");
  const [data, setData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [isOverBudget, setIsOverBudget] = useState(0);
  const [withinBudget, setWithinBudget] = useState(0);
  const [overBudget, setOverBudget] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    axios
      .get("http://localhost:8000/budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        const budgetData = response.data.data;
        console.log(budgetData);

        if (budgetData.length > 0) {
          const currentMonthName = currentMonth.format("MMMM");

          const matchingBudget = budgetData.find(
            (budget) => budget.month === currentMonthName
          );

          console.log("Matching budget: ", matchingBudget);

          if (matchingBudget) {
            setFetchedAmount(matchingBudget.amount);
          } else {
            setFetchedAmount(0);
          }
        }
      })
      .catch((error) => {
        console.log("Axios Error:", error);
      });
  }, [currentMonth]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    axios
      .get("http://localhost:8000/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const allData = res.data.data;
        setData(allData);

        // Filter data based on the current month
        const filteredData = allData.filter((item) =>
          dayjs(item.date).isSame(currentMonth, "month")
        );

        const expenses = filteredData.filter(
          (item) => item.type.toLowerCase() === "expense"
        );

        // Calculate total expenses
        const totalExpenses = expenses.reduce(
          (sum, item) => sum + item.amount,
          0
        );

        setTotalExpenses(totalExpenses);

        // Calculate the percentage over budget
        if (fetchedAmount > 0) {
          const overBudgetAmount = totalExpenses - fetchedAmount;
          setIsOverBudget((overBudgetAmount / fetchedAmount) * 100);
        } else {
          setIsOverBudget(0);
        }
        if (fetchedAmount > totalExpenses) {
          setWithinBudget(fetchedAmount - totalExpenses);
        } else {
          setOverBudget(totalExpenses - fetchedAmount);
        }
        console.log("Total Expenses:", totalExpenses);
        console.log("Is Over Budget:", isOverBudget);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentMonth, fetchedAmount]); // Added fetchedAmount to the dependency array

  const handleBudgetSubmit = () => {
    const data = {
      amount: Number(amount), // Convert amount to number
      month,
    };
    axios
      .post("http://localhost:8000/budget", data)
      .then((res) => {
        console.log(res);
        // Optional: Update fetched amount after submitting the new budget
      })
      .catch((error) => {
        console.log("Error occurred! Please fill out all fields.", error);
      });
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Header Section: Display Budget Info and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 my-14 px-4">
        <div>
          <h1 className="text-3xl text-yellow-700 font-semibold">
            {fetchedAmount}
          </h1>
          <p className="text-sm text-stone-400 mt-1">{month} Monthly Budget</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            className="rounded-lg h-10 w-48 px-4 cursor-pointer bg-stone-900 text-stone-200 
                   placeholder:text-stone-500 focus:outline-none"
            onChange={(e) => setMonth(e.target.value)}
          >
            <option
              value="select"
              className="text-xs font-semibold text-stone-500"
            >
              Select Month
            </option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <option
                key={month}
                value={month}
                className="text-xs font-semibold"
              >
                {month}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Update Budget"
              className="rounded-lg h-10 w-56 px-4 bg-stone-900 text-stone-200 
                     placeholder:text-stone-500 focus:outline-none"
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className="rounded-lg bg-stone-800 px-4 text-white h-10 hover:bg-stone-700"
              onClick={handleBudgetSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Budget Overview Cards */}
      <div className="bg-stone-900 rounded-3xl p-4 flex flex-wrap gap-4 cursor-pointer">
        {/* Over/Under Budget Card */}
        <section
          className="h-24 px-8 rounded-3xl flex flex-col items-center justify-center 
                      shadow-md border border-stone-800 bg-stone-900"
        >
          {isOverBudget > 0 ? (
            <>
              <h1 className="text-2xl text-red-400 font-semibold">
                {isOverBudget.toFixed(2)}%
              </h1>
              <p className="text-xs text-stone-400 mt-2">
                spending over the budget amount.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl text-green-600 font-semibold">
                {Math.abs(isOverBudget.toFixed(2))}%
              </h1>
              <p className="text-xs text-stone-400 mt-2">
                spending under the budget amount.
              </p>
            </>
          )}
        </section>

        {/* Budget Status Card */}
        <section
          className="h-24 px-8 rounded-3xl flex flex-col items-center justify-center 
                      shadow-md border border-stone-800 bg-stone-900"
        >
          {fetchedAmount > totalExpenses ? (
            <>
              <h1 className="text-2xl text-green-600 font-semibold">
                {withinBudget}
              </h1>
              <p className="text-xs text-stone-400 mt-2">
                to spend within budget
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl text-red-400 font-semibold">
                {overBudget}
              </h1>
              <p className="text-xs text-stone-400 mt-2">
                already spent over budget
              </p>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default MonthlyBudget;
