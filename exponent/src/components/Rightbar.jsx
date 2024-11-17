import axios from "axios";
import { useEffect, useState } from "react";

const Rightbar = () => {
  const [data, setData] = useState(0);
  const [earning, setEarning] = useState(0);
  const [latestEarning, setLatestEarning] = useState(null);
  const [latestEarningCategory, setLatestEarningCategory] = useState(null);
  const [latestExpense, setLatestExpense] = useState(null);
  const [latestExpenseCategory, setLatestExpenseCategory] = useState(null); // State for latest expense amount

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

        // Filter earnings (case-insensitive)
        const earnings = allData.filter(
          (item) => item.type.toLowerCase() === "earning"
        );

        // Filter expenses (case-insensitive)
        const expenses = allData.filter(
          (item) => item.type.toLowerCase() === "expense"
        );

        // Find the latest earning, if available
        if (earnings.length > 0) {
          const latestEarningEntry = earnings.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          )[0];
          setLatestEarning(latestEarningEntry.amount);
          setLatestEarningCategory(latestEarningEntry.source);
        }

        // Find the latest expense, if available
        if (expenses.length > 0) {
          const latestExpenseEntry = expenses.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          )[0];
          setLatestExpense(latestExpenseEntry.amount);
          setLatestExpenseCategory(latestExpenseEntry.source);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 w-72 h-96 p-4 font-new">
        <section className="flex gap-4 justify-center">
          <section className=" h-24 w-28 rounded-3xl justify-center items-center flex flex-col shadow-md bg-stone-800">
            <h1 className="text-2xl text-teal-400 font-semibold">8.4</h1>
            <p className="text-xs text-stone-400 mt-2"> Exponent Score</p>
          </section>
          <section className=" h-24 w-32 rounded-3xl justify-center items-center flex flex-col shadow-md bg-stone-800">
            <h1 className="text-xl text-teal-500 font-semibold">Healthy</h1>
            <p className="text-xs text-stone-400 mt-2">Financial Habit</p>
          </section>
        </section>
        <section className="border border-stone-700 w-full rounded-3xl p-4 px-8 mt-4">
          <h1 className="text-lg text-stone-300">Recent Inflow</h1>
          <h1 className="text-teal-400 text-2xl font-semibold">
            {latestEarning} ₹
          </h1>
          <p className="text-xs text-stone-400">from {latestEarningCategory}</p>
        </section>
        <section className="border border-stone-700 w-full rounded-3xl p-4 px-8 ">
          <h1 className="text-lg text-stone-300">Recent Outflow</h1>
          <h1 className="text-red-400 text-2xl font-semibold">
            {latestExpense} ₹
          </h1>
          <p className="text-xs text-stone-400">from {latestExpenseCategory}</p>
        </section>
      </div>
    </div>
  );
};

export default Rightbar;
