import Navbar from "../components/Navbar";
import LeftBar from "../components/LeftBar";
import Rightbar from "../components/Rightbar";
import Tab from "../components/Tab";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MonthlyBudget from "../components/MonthlyBudget";
import TransactionDetail from "../components/TransactionDetail";
import { useEffect, useState } from "react";
import axios from "axios";


const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    // // Retrieve the token from local storage
    // const token = localStorage.getItem("jwtToken");
    // // console.log("Token:", token);
    // // Set the Authorization header in axios request config
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    // Send the GET request with the token included in the headers
    axios
      .get("http://localhost:8000/")
      .then((response) => {
        setTransactions(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("Axios Error:", error);
      });
  }, []);

  const handleType = (e) => {
    // Convert the input to lowercase and update state
    setType(e.target.value.toLowerCase());
  };

  const handleListTransaction = () => {
    const data = {
      amount,
      type,
      source,
      date,
      category
    };
  
    axios
      .post("http://localhost:8000/", data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("Error occurred! Please fill out all fields. ", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <LeftBar />
        <main className="w-screen p-2  px-4 rounded-xl">
          {/* <h1 className="text-2xl font-normal text-stone-500">
            Welcome back, Anurag
          </h1> */}

          <section className="flex flex-col ">
            <div className="flex flex-col items-center mt-4">
              <div className="flex justify-around w-full">
                <ArrowBackIosRoundedIcon className="text-stone-500 cursor-pointer" />
                <h1 className="text-stone-600 text-2xl pb-2 font-semibold">
                  August
                </h1>
                <ArrowForwardIosRoundedIcon className="text-stone-500 cursor-pointer" />
              </div>
              <section className="h-72 bg-green-50 rounded-3xl p-4 mt-8 w-full">
                <h1>Analytics</h1>
              </section>
              <section>
                <MonthlyBudget />
                <section className="mt-10 border border-stone-200 rounded-2xl p-8 w-full shadow-md">
                  <div>
                    <h1 className="text-xl text-stone-600 mb-8">
                      Add a new Entry
                    </h1>
                    <input
                      type="text"
                      placeholder="Enter Amount"
                      className="border rounded-lg h-10 w-48 px-4 m-2"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Enter Type earning / expense "
                      className="border rounded-lg h-10 w-64 px-4 m-2"
                      onChange={handleType}
                    />
                    <input
                      type="text"
                      placeholder="Enter Source ie. Gpay"
                      className="border rounded-lg h-10 w-48 px-4 m-2"
                      onChange={(e) => setSource(e.target.value)}
                    />
                    <input
                      type="date"
                      className="border rounded-lg h-10 w-48 px-4 m-2 text-stone-400 cursor-pointer"
                      placeholder="Add Date"
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <select
                      className="border rounded-lg h-10 w-48 px-4 m-2 text-stone-400 cursor-pointer"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option
                        value="Entertainment"
                        className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                      >
                        Select Category
                      </option>
                      <option
                        value="Entertainment"
                        className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                      >
                        Entertainment
                      </option>
                      <option
                        value="Bills"
                        className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                      >
                        Bills
                      </option>
                      <option
                        value="Groceries"
                        className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                      >
                        Groceries
                      </option>
                      <option
                        value="Household"
                        className="cursor-pointer outline-none text-xs font-semibold rounded-xl px-3 py-1"
                      >
                        Household
                      </option>
                    </select>
                  </div>
                  <button className="border rounded-lg bg-green-600 px-4 ml-2 p-1 mt-10 text-white" onClick={handleListTransaction}>
                    Add Entry
                  </button>
                </section>
                <div className="flex justify-center items-center mt-10">
                  <h1 className="text-lg">Recent Transactions</h1>
                </div>
              </section>
              <div className="flex flex-row mt-8">
                <Tab content="All" />
                <Tab content="Earnings" />
                <Tab content="Expenses" />
              </div>
            </div>
            <div className="flex justify-start items-start gap-2 cursor-pointer">
              <SortRoundedIcon className="text-stone-600" />
              <h1 className="text-stone-600">sort</h1>
            </div>
            <section className="flex flex-col gap-4 mt-4  p-4">
            {transactions
            .slice()
            .reverse()
            .map((transaction, index) => (
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
