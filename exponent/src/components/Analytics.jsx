import axios from "axios";
import { useEffect, useState } from "react";
import BarGraph from "./BarGraph";
import dayjs from "dayjs"; // Import Day.js

const Analytics = ({ currentMonth }) => {
  const [earnings, setEarnings] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);
  const [savingsPercentage, setSavingsPercentage] = useState(0);
  const [earningExpenseRatio, setEarningExpenseRatio] = useState(0);
  const [data, setData] = useState([]);
  const idealSavingsPercentage = 20;

  const savingsDifference = savingsPercentage - idealSavingsPercentage;
  const isHigher = savingsPercentage > idealSavingsPercentage;

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => {
        const allData = res.data.data;
        setData(allData);

        // Filter data based on the current month
        const filteredData = allData.filter((item) =>
          dayjs(item.date).isSame(currentMonth, "month")
        );

        // Calculate earnings and expenses for the filtered month
        const earnings = filteredData.filter(
          (item) => item.type.toLowerCase() === "earning"
        );
        const totalEarnings = earnings.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        setEarnings(totalEarnings);

        const expenses = filteredData.filter(
          (item) => item.type.toLowerCase() === "expense"
        );
        const totalExpenses = expenses.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        setExpenses(totalExpenses);

        const calculatedSavings = totalEarnings - totalExpenses;
        setSavings(Math.max(calculatedSavings, 0)); // Ensure savings never go below 0

        // Handle savings percentage logic
        if (totalEarnings === 0 && totalExpenses === 0) {
          setSavingsPercentage(0); // No data, set savingsPercentage to 0%
        } else {
          const savingsPercent = (calculatedSavings / totalEarnings) * 100;
          setSavingsPercentage(Math.max(savingsPercent, 0)); // Avoid negative percentage
        }

        // Handle earning to expense ratio
        if (totalExpenses === 0) {
          setEarningExpenseRatio(totalEarnings > 0 ? Infinity : 0); // Avoid divide-by-zero issues
        } else {
          const ratio = totalEarnings / totalExpenses;
          setEarningExpenseRatio(ratio);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentMonth]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => {
        const allData = res.data.data;
        setData(allData);

        // Filter data based on the current month
        const filteredData = allData.filter((item) =>
          dayjs(item.date).isSame(currentMonth, "month")
        );
        console.log(filteredData);
        // Calculate earnings and expenses for the filtered month
        const earnings = filteredData.filter(
          (item) => item.type.toLowerCase() === "earning"
        );
        const totalEarnings = earnings.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        setEarnings(totalEarnings);

        const expenses = filteredData.filter(
          (item) => item.type.toLowerCase() === "expense"
        );
        const totalExpenses = expenses.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        setExpenses(totalExpenses);

        const calculatedSavings = totalEarnings - totalExpenses;
        setSavings(Math.max(calculatedSavings, 0));

        if (totalEarnings > 0) {
          const savingsPercent = (calculatedSavings / totalEarnings) * 100;
          setSavingsPercentage(savingsPercent);
        }
        if (totalEarnings == 0 && totalExpenses == 0) {
          setSavingsPercentage(0);
        }

        if (totalExpenses > 0) {
          const ratio = totalEarnings / totalExpenses;
          setEarningExpenseRatio(ratio);
        }
        if (totalEarnings == 0 && totalExpenses == 0) {
          setEarningExpenseRatio(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentMonth]); // Re-run effect when currentMonth changes

  const expenseToEarningsPercentage = (expenses / earnings) * 100;

  return (
    <section className="h-72 bg-stone-900 rounded-3xl p-4 mt-8 w-full cursor-pointer">
      <div className="flex justify-around">
        <BarGraph
          data={data}
          earnings={earnings}
          expenses={expenses}
          savings={savings}
          savingsPercentage={savingsPercentage}
          earningExpenseRatio={earningExpenseRatio}
          currentMonth={currentMonth}
        />
        <div className="flex flex-col justify-between">
          <div className="flex gap-8">
            <section className=" h-24 w-28 rounded-3xl border border-stone-800 bg-stone-900 justify-center items-center flex flex-col shadow-md">
              <h1 className="text-2xl text-green-600 font-semibold">
                {earnings}
              </h1>
              <p className="text-xs text-stone-400 mt-2">Total Earnings</p>
            </section>
            <section className=" h-24 w-28 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
              <h1 className="text-2xl text-red-400 font-semibold">
                {expenses}
              </h1>
              <p className="text-xs text-stone-400 mt-2">Total Expenses</p>
            </section>
            <section className=" h-24 w-28 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
              <h1 className="text-2xl text-green-600 font-semibold">
                {savings}
              </h1>
              <p className="text-xs text-stone-400 mt-2">Total Savings</p>
            </section>
          </div>
          <div className="flex justify-between gap-4">
            <section className=" h-24 w-42 px-4 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
              <h1 className="text-2xl text-stone-400 font-semibold">
                {earningExpenseRatio.toFixed(2)}
              </h1>
              <p className="text-xs text-stone-400 mt-2">
                Earning to Expense Ratio
              </p>
            </section>

            {isHigher ? (
              <section className=" h-24 w-fit px-2 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
                <h1 className="text-xl text-green-600 font-semibold">
                  {Math.abs(savingsDifference).toFixed(2)}% higher
                </h1>
                <p className="text-xs text-stone-400 mt-2">
                  Your savings percentage is than the ideal rate.
                </p>
              </section>
            ) : (
              <section className=" h-24 w-fit px-2 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
                <h1 className="text-xl text-red-400 font-semibold">
                  {Math.abs(savingsDifference).toFixed(2)}% lower
                </h1>
                <p className="text-xs text-stone-400 mt-2">
                  Your savings percentage is than the ideal rate.
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
