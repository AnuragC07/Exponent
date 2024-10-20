import Navbar from "../components/Navbar";
import LeftBar from "../components/LeftBar";
import Rightbar from "../components/Rightbar";
import Tab from "../components/Tab";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MonthlyBudget from "../components/MonthlyBudget";
import TransactionDetail from "../components/TransactionDetail";
import Analytics from "../components/Analytics";

import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs"; // For date manipulation

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  // Track the currently displayed month and year
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  // Fetch transactions for the current month
  useEffect(() => {
    fetchTransactions(currentMonth);
  }, [currentMonth]);

  const fetchTransactions = (month) => {
    const selectedMonth = dayjs(month); // Wrap the date input with dayjs
    const year = selectedMonth.format("YYYY"); // Get the year
    const monthNumber = selectedMonth.format("M"); // Get the month as a number (1-12)

    axios
      .get(
        `http://localhost:8000/transactions?month=${monthNumber}&year=${year}`
      )
      .then((response) => {
        const sortedTransactions = response.data.data.sort(
          (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
        );
        setTransactions(sortedTransactions);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.log("Axios Error:", error);
      });
  };

  const handleMonthChange = (direction) => {
    setCurrentMonth((prev) =>
      direction === "prev" ? prev.subtract(1, "month") : prev.add(1, "month")
    );
  };

  const handleType = (e) => setType(e.target.value.toLowerCase());

  const handleListTransaction = () => {
    const data = { amount, type, source, date, category };
    axios
      .post("http://localhost:8000/", data)
      .then((res) => console.log("Amount listing success", res))
      .catch((error) => {
        console.log("Error occurred! Please fill out all fields.", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-full bg-stone-900">
        <LeftBar />
        <main className="w-screen p-2 px-4 rounded-3xl bg-stone-950 pt-4 mt-4 mb-4 shadow-md">
          <section className="flex flex-col">
            <div className="flex flex-col items-center mt-4">
              <div className="flex justify-around w-full">
                <div
                  className="flex justify-center items-center"
                  onClick={() => handleMonthChange("prev")}
                >
                  <ArrowBackIosRoundedIcon className="text-stone-400 border border-stone-800 bg-stone-800 rounded-full p-1 cursor-pointer" />
                </div>
                <h1 className="text-stone-300 text-2xl pb-2 font-semibold">
                  {currentMonth.format("MMMM")}
                </h1>
                <div
                  className="flex justify-center items-center"
                  onClick={() => handleMonthChange("next")}
                >
                  <ArrowForwardIosRoundedIcon className="text-stone-400 border border-stone-800 bg-stone-800 rounded-full p-1 cursor-pointer" />
                </div>
              </div>
              <Analytics currentMonth={currentMonth} />
              <section>
                <MonthlyBudget currentMonth={currentMonth} />
                <section className="mt-10 border border-stone-900 rounded-3xl p-8 w-full shadow-2xl bg-gradient-to-r from-stone-950 to-stone-900">
                  <h1 className="text-2xl text-white mb-6 font-semibold">
                    Add a New Entry
                  </h1>

                  <div className="flex flex-wrap gap-4">
                    {/* Amount Input: Only Numbers */}
                    <input
                      type="number"
                      placeholder="Enter Amount"
                      className="flex-1 min-w-[200px] rounded-md h-12 px-4 bg-stone-800 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-green-900"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) setAmount(value); // Allow only digits
                      }}
                    />

                    {/* Type Input: Accepts only Strings */}
                    <input
                      type="text"
                      placeholder="Enter Type (earning / expense)"
                      className="flex-1 min-w-[250px] rounded-md h-12 px-4 bg-stone-800 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-green-900"
                      onChange={handleType}
                    />

                    {/* Source Input: Accepts only Strings */}
                    <input
                      type="text"
                      placeholder="Enter Source (e.g., Gpay)"
                      className="flex-1 min-w-[200px] rounded-md h-12 px-4 bg-stone-800 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-green-900"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[a-zA-Z\s]*$/.test(value)) setSource(value); // Allow only letters and spaces
                      }}
                    />

                    {/* Date Input */}
                    <input
                      type="date"
                      className="flex-1 min-w-[200px] rounded-md h-12 px-4 cursor-pointer bg-stone-800 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-green-900"
                      onChange={(e) => setDate(e.target.value)}
                    />

                    {/* Category Input */}
                    <select
                      className="flex-1 min-w-[200px] rounded-md h-12 px-4 bg-stone-800 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-900"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Bills">Bills</option>
                      <option value="Groceries">Groceries</option>
                      <option value="Household">Household</option>
                    </select>
                  </div>

                  <button
                    className="mt-8 w-full md:w-fit rounded-md bg-gradient-to-r from-stone-900 to-stone-800 transition-colors px-12 py-3 text-white font-semibold shadow-lg"
                    onClick={handleListTransaction}
                  >
                    Add Entry
                  </button>
                </section>

                <div className="flex justify-center items-center mt-10">
                  <h1 className="text-xl text-stone-200">
                    Recent Transactions
                  </h1>
                </div>
              </section>
              <div className="flex flex-row mt-8">
                <Tab content="All" />
                <Tab content="Earnings" />
                <Tab content="Expenses" />
              </div>
            </div>
            <div className="flex justify-start items-start gap-2 cursor-pointer">
              <SortRoundedIcon className="text-stone-500" />
              <h1 className="text-stone-500">Sort</h1>
            </div>
            <section className="flex flex-col gap-4 mt-4 p-4">
              {transactions.map((transaction, index) => (
                <TransactionDetail
                  key={index}
                  date={transaction.date}
                  source={transaction.source}
                  category={transaction.category}
                  type={transaction.type}
                  amount={transaction.amount}
                />
              ))}
            </section>
          </section>
        </main>
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;
