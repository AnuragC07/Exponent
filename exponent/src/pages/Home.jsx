import Navbar from "../components/Navbar";
import LeftBar from "../components/LeftBar";
import Rightbar from "../components/Rightbar";
import Tab from "../components/Tab";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MonthlyBudget from "../components/MonthlyBudget";
const Home = () => {
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
                    />
                    <input
                      type="text"
                      placeholder="Enter Type ie. Expense / Earning "
                      className="border rounded-lg h-10 w-48 px-4 m-2"
                    />
                    <input
                      type="text"
                      placeholder="Enter Source ie. Gpay"
                      className="border rounded-lg h-10 w-48 px-4 m-2"
                    />
                    <input
                      type="date"
                      className="border rounded-lg h-10 w-48 px-4 m-2 text-stone-400 cursor-pointer"
                      placeholder="Add Date"
                    />
                    <select
                      className="border rounded-lg h-10 w-48 px-4 m-2 text-stone-400 cursor-pointer"
                      
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
                  <button className="border rounded-lg bg-green-600 px-4 ml-2 p-1 mt-10 text-white">
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
              <div className="flex justify-evenly">
                <p className="text-stone-600">2 August 2024</p>
                <p className="text-stone-600">from Gpay</p>
                <p className="text-stone-600">Bills</p>
                <h1 className="text-xl text-green-700 font-semibold">234 ₹</h1>
              </div>
              <div className="flex justify-evenly">
                <p className="text-stone-600">2 August 2024</p>
                <p className="text-stone-600">from Gpay</p>
                <p className="text-stone-600">Bills</p>
                <h1 className="text-xl text-green-700 font-semibold">181 ₹</h1>
              </div>
              <div className="flex justify-evenly">
                <p className="text-stone-600">2 August 2024</p>
                <p className="text-stone-600">from Gpay</p>
                <p className="text-stone-600">Bills</p>
                <h1 className="text-xl text-red-400 font-semibold">85 ₹</h1>
              </div>
            </section>
          </section>
        </main>
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;
