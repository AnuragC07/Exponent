import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LeftBar from "../components/LeftBar";
import Rightbar from "../components/Rightbar";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import axios from "axios";
import BarGraph from "../components/BarGraph";

const FullAnalytics = () => {
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
        setData(res.data.data);
        const earnings = res.data.data.filter(
          (item) => item.type === "earning" || item.type === "Earning"
        );
        const totalEarnings = earnings.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        setEarnings(totalEarnings);

        const expenses = res.data.data.filter(
          (item) => item.type === "expense" || item.type === "Expense"
        );
        const totalExpenses = expenses.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        setExpenses(totalExpenses);
        const calculatedSavings = totalEarnings - totalExpenses;
        setSavings(calculatedSavings);

        if (totalEarnings > 0) {
          const savingsPercent = (calculatedSavings / totalEarnings) * 100;
          setSavingsPercentage(savingsPercent);
        }

        if (totalExpenses > 0) {
          const ratio = totalEarnings / totalExpenses;
          setEarningExpenseRatio(ratio);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const expenseToEarningsPercentage = (expenses / earnings) * 100;

  return (
    <div>
      <Navbar />
      <div className="flex h-full bg-stone-900">
        <LeftBar />
        <section className="w-screen p-2  px-4 rounded-3xl bg-stone-950 pt-4 mt-4 mb-4 shadow-md">
          <div className="flex justify-around w-full">
            <div className="flex justify-center items-center">
              <ArrowBackIosRoundedIcon className="text-stone-400 border border-stone-800 bg-stone-800 rounded-full p-1 cursor-pointer" />
            </div>
            <h1 className="text-stone-300 text-2xl pb-2 font-semibold">
              August analytics
            </h1>
            <div className="flex justify-center items-center">
              <ArrowForwardIosRoundedIcon className="text-stone-400 border border-stone-800 bg-stone-800 rounded-full p-1 cursor-pointer" />
            </div>
          </div>
          <section className="h-72 bg-stone-900 rounded-3xl p-4 mt-8 w-full cursor-pointer">
            <div className="flex justify-around">
              <BarGraph
                data={data}
                earnings={earnings}
                expenses={expenses}
                savings={savings}
                savingsPercentage={savingsPercentage}
                earningExpenseRatio={earningExpenseRatio}
              />
              <div className="flex flex-col justify-between">
                <div className="flex gap-8">
                  <section className=" h-32 w-52 rounded-3xl border border-stone-800 bg-stone-900 justify-center items-center flex flex-col shadow-md ">
                    <h1 className="text-3xl text-green-600 font-semibold">
                      {" "}
                      {earnings}
                    </h1>
                    <p className="text-xs text-stone-400 mt-2">
                      Total Earnings
                    </p>
                  </section>
                  <section className=" h-32 w-52 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
                    <h1 className="text-3xl text-red-400 font-semibold">
                      {" "}
                      {expenses}
                    </h1>
                    <p className="text-xs text-stone-400 mt-2">
                      Total Expenses
                    </p>
                  </section>
                </div>

                <div className="flex justify-between gap-4">
                  <section className=" h-24 w-52 px-4 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
                    <h1 className="text-2xl text-stone-400 font-semibold">
                      {" "}
                      {earningExpenseRatio.toFixed(2)}
                    </h1>
                    <p className="text-xs text-stone-400 mt-2">
                      Earning to Expense Ratio
                    </p>
                  </section>
                  <section className=" h-24 w-42 px-4 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
                    <h1 className="text-2xl text-stone-400 font-semibold">
                      {expenseToEarningsPercentage.toFixed(2)}%
                    </h1>
                    <p className="text-xs text-stone-400 mt-2">
                      Eearnings to Expenses Percentage{" "}
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </section>
          <div className="flex gap-6 mb-2">
            <div className="h-72 bg-stone-900 rounded-3xl p-4 mt-4 w-full cursor-pointer flex flex-col gap-4">
              <h1 className="text-stone-500 text-xl ml-2">Savings</h1>
              <div className="flex gap-4 flex-wrap">
                <section className=" h-24 w-36 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
                  <h1 className="text-2xl text-green-600 font-semibold">
                    {" "}
                    {savings}
                  </h1>
                  <p className="text-xs text-stone-400 mt-2">Total Savings</p>
                </section>
                {isHigher ? (
                  <section className=" h-24 w-fit px-2 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
                    <h1 className="text-xl text-green-600 font-semibold">
                      {" "}
                      {Math.abs(savingsDifference).toFixed(2)}% higher
                    </h1>
                    <p className="text-xs text-stone-400 mt-2">
                      Your savings percentage is than the ideal rate.
                    </p>
                  </section>
                ) : (
                  <section className=" h-24 w-fit px-2 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
                    <h1 className="text-xl text-red-400 font-semibold">
                      {" "}
                      {Math.abs(savingsDifference).toFixed(2)}% lower
                    </h1>
                    <p className="text-xs text-stone-400 mt-2">
                      {" "}
                      Your savings percentage is than the ideal rate.
                    </p>
                  </section>
                )}
                <section className="h-24 w-36 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
                  <h1 className="text-xl text-green-600 font-semibold">
                    {savingsPercentage.toFixed(2)}%
                  </h1>
                  <p className="text-xs text-stone-400 mt-2">
                    {" "}
                    Savings Percentage
                  </p>
                </section>
              </div>
            </div>
            <div className="h-72 bg-stone-900 rounded-3xl p-4 mt-4 w-full cursor-pointer flex flex-wrap gap-4">
              {/* monthly budget stuff */}
              <section className=" h-28 w-52 rounded-3xl border border-stone-800 bg-stone-900 justify-center items-center flex flex-col shadow-md ">
                <h1 className="text-3xl text-green-600 font-semibold">
                  {" "}
                  {earnings}
                </h1>
                <p className="text-xs text-stone-400 mt-2">Monthly Budget</p>
              </section>
              {isHigher ? (
                <section className=" h-28 w-fit px-4 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
                  <h1 className="text-xl text-green-600 font-semibold">
                    {" "}
                    {Math.abs(savingsDifference).toFixed(2)}%
                  </h1>
                  <p className="text-xs text-stone-400 mt-2">
                    You are under budget
                  </p>
                </section>
              ) : (
                <section className=" h-28 w-fit px-4 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
                  <h1 className="text-xl text-red-400 font-semibold">
                    {" "}
                    {Math.abs(savingsDifference).toFixed(2)}%
                  </h1>
                  <p className="text-xs text-stone-400 mt-2">
                    {" "}
                    You are over budget
                  </p>
                </section>
              )}
              {isHigher ? (
                <section className=" h-28 w-fit px-4 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
                  <h1 className="text-xl text-green-600 font-semibold">
                    {" "}
                    {Math.abs(savingsDifference).toFixed(2)}%
                  </h1>
                  <p className="text-xs text-stone-400 mt-2">
                    You are under budget
                  </p>
                </section>
              ) : (
                <section className=" h-28 w-fit px-4 rounded-3xl justify-center items-center flex flex-col shadow-md border border-stone-800 bg-stone-900">
                  <h1 className="text-xl text-red-400 font-semibold">
                    {" "}
                    {Math.abs(savingsDifference).toFixed(2)}%
                  </h1>
                  <p className="text-xs text-stone-400 mt-2">
                    {" "}
                    You are over budget
                  </p>
                </section>
              )}
            </div>
          </div>
        </section>
        <Rightbar />
      </div>
    </div>
  );
};

export default FullAnalytics;
