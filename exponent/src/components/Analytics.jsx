import axios from "axios";
import { useEffect, useState } from "react";
import BarGraph from "./BarGraph";
import CategoryBarGraph from "./CategoryBargraph";
import dayjs from "dayjs"; // Import Day.js
import ailogo from "../assets/ai logo.svg";
const Analytics = ({ currentMonth }) => {
  const [earnings, setEarnings] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);
  const [savingsPercentage, setSavingsPercentage] = useState(0);
  const [earningExpenseRatio, setEarningExpenseRatio] = useState(0);
  const [data, setData] = useState([]);
  const idealSavingsPercentage = 20;
  const [entCategory, setEntCategory] = useState(0);
  const [billCategory, setBillCategory] = useState(0);
  const [groCategory, setGroCategory] = useState(0);
  const [houseCategory, setHouseCategory] = useState(0);
  const [entCategoryRatio, setEntCategoryRatio] = useState(0);
  const [billCategoryRatio, setBillCategoryRatio] = useState(0);
  const [groCategoryRatio, setGroCategoryRatio] = useState(0);
  const [houseCategoryRatio, setHouseCategoryRatio] = useState(0);
  const savingsDifference = savingsPercentage - idealSavingsPercentage;
  const isHigher = savingsPercentage > idealSavingsPercentage;
  const [insight, setInsight] = useState("");

  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/")
  //     .then((res) => {
  //       const allData = res.data.data;
  //       setData(allData);

  //       // Filter data based on the current month
  //       const filteredData = allData.filter((item) =>
  //         dayjs(item.date).isSame(currentMonth, "month")
  //       );

  //       // Calculate earnings and expenses for the filtered month
  //       const earnings = filteredData.filter(
  //         (item) => item.type.toLowerCase() === "earning"
  //       );
  //       const totalEarnings = earnings.reduce(
  //         (sum, item) => sum + item.amount,
  //         0
  //       );
  //       setEarnings(totalEarnings);

  //       const expenses = filteredData.filter(
  //         (item) => item.type.toLowerCase() === "expense"
  //       );
  //       const totalExpenses = expenses.reduce(
  //         (sum, item) => sum + item.amount,
  //         0
  //       );
  //       setExpenses(totalExpenses);

  //       const calculatedSavings = totalEarnings - totalExpenses;
  //       setSavings(Math.max(calculatedSavings, 0)); // Ensure savings never go below 0

  //       // Handle savings percentage logic
  //       if (totalEarnings === 0 && totalExpenses === 0) {
  //         setSavingsPercentage(0); // No data, set savingsPercentage to 0%
  //       } else {
  //         const savingsPercent = (calculatedSavings / totalEarnings) * 100;
  //         setSavingsPercentage(Math.max(savingsPercent, 0)); // Avoid negative percentage
  //       }

  //       // Handle earning to expense ratio
  //       if (totalExpenses === 0) {
  //         setEarningExpenseRatio(totalEarnings > 0 ? Infinity : 0); // Avoid divide-by-zero issues
  //       } else {
  //         const ratio = totalEarnings / totalExpenses;
  //         setEarningExpenseRatio(ratio);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [currentMonth]);
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
        console.log("data: ", filteredData);

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

        //categories total calculation
        const entCategory = filteredData.filter(
          (item) =>
            item.category.toLowerCase() === "entertainment" &&
            item.type.toLowerCase() === "expense"
        );
        const totalEntCategory = entCategory.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        console.log(totalEntCategory);
        setEntCategory(totalEntCategory);

        const billCategory = filteredData.filter(
          (item) =>
            item.category.toLowerCase() === "bills" &&
            item.type.toLowerCase() === "expense"
        );

        const totalBillCategory = billCategory.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        setBillCategory(totalBillCategory);

        const groCategory = filteredData.filter(
          (item) =>
            item.category.toLowerCase() === "groceries" &&
            item.type.toLowerCase() === "expense"
        );

        const totalGroCategory = groCategory.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        setGroCategory(totalGroCategory);

        const houseCategory = filteredData.filter(
          (item) =>
            item.category.toLowerCase() === "household" &&
            item.type.toLowerCase() === "expense"
        );

        const totalHouseCategory = houseCategory.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        setHouseCategory(totalHouseCategory);

        //catgory ratios
        const entCategoryRatio = (totalEntCategory / totalExpenses) * 100;
        const formattedEntCategoryRatio = parseFloat(
          entCategoryRatio.toFixed(2)
        );
        setEntCategoryRatio(formattedEntCategoryRatio);

        const billCategoryRatio = (totalBillCategory / totalExpenses) * 100;
        const formattedBillCategoryRatio = parseFloat(
          billCategoryRatio.toFixed(2)
        );
        setBillCategoryRatio(formattedBillCategoryRatio);

        const groCategoryRatio = (totalGroCategory / totalExpenses) * 100;
        const formattedGroCategoryRatio = parseFloat(
          groCategoryRatio.toFixed(2)
        );
        setGroCategoryRatio(formattedGroCategoryRatio);

        const houseCategoryRatio = (totalHouseCategory / totalExpenses) * 100;
        const formattedHouseCategoryRatio = parseFloat(
          houseCategoryRatio.toFixed(2)
        );
        setHouseCategoryRatio(formattedHouseCategoryRatio);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentMonth]); // Re-run effect when currentMonth changes

  // const expenseToEarningsPercentage = (expenses / earnings) * 100;

  async function generateInsights() {
    setInsight("Generating AI insights...");

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Analyze the following financial details and suggest **actionable insights** to optimize spending and savings. Provide each suggestion without any bold or headings.

1. Total Earnings: ${earnings}
2. Total Expenses: ${expenses}
3. Total Savings: ${savings}
4. Earnings to Expense Ratio: ${earningExpenseRatio}
6. Category-wise Expenses (in ₹):
   - Entertainment: ${entCategory}
   - Bills: ${billCategory}
   - Groceries: ${groCategory}
   - Household: ${houseCategory}
7. Category-wise Contribution to Total Expenses (in %):
   - Entertainment: ${entCategoryRatio}%
   - Bills: ${billCategoryRatio}%
   - Groceries: ${groCategoryRatio}%
   - Household: ${houseCategoryRatio}%
8. Timeframe: ${currentMonth}

Only provide concise and meaningful points
Keep it brief and to the point.`,
                },
              ],
            },
          ],
        },
      });
      setInsight(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating title:", error);
      setInsight("Failed to generate title. Please try again.");
    }
  }

  return (
    <>
      <section className="h-fit  rounded-3xl border border-stone-900 bg-stone-950 p-4 mt-10 w-full cursor-pointer shadow-lg">
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

          {/* Overview Cards */}
          <div className="flex flex-col gap-14 mt-4 ml-4">
            <div className="flex gap-4">
              <section className="h-28 w-32 rounded-3xl border border-stone-900 bg-gradient-to-t from-stone-950 to-stone-900 flex flex-col justify-center items-center shadow-lg">
                <h1 className="text-2xl text-teal-400 font-semibold">
                  {earnings} ₹
                </h1>
                <p className="text-sm text-stone-400 mt-2">Total Earnings</p>
              </section>

              <section className="h-28 w-32 rounded-3xl border border-stone-900 bg-gradient-to-t from-stone-950 to-stone-900 flex flex-col justify-center items-center shadow-lg ">
                <h1 className="text-2xl text-red-400 font-semibold">
                  {expenses} ₹
                </h1>
                <p className="text-sm text-stone-400 mt-2">Total Expenses</p>
              </section>

              <section className="h-28 w-32 rounded-3xl border border-stone-900 bg-gradient-to-t from-stone-950 to-stone-900 flex flex-col justify-center items-center shadow-lg ">
                <h1 className="text-2xl text-teal-400 font-semibold">
                  {savings} ₹
                </h1>
                <p className="text-sm text-stone-400 mt-2">Total Savings</p>
              </section>
            </div>

            <div className="flex justify-between gap-6">
              <section className="h-28 w-48 px-4 rounded-3xl border border-stone-900 bg-gradient-to-t from-stone-950 to-stone-900 flex flex-col justify-center items-center shadow-lg ">
                <h1 className="text-2xl text-stone-300 font-semibold">
                  {earningExpenseRatio.toFixed(2)}
                </h1>
                <p className="text-sm text-stone-400 mt-2 text-center">
                  Earning to Expense Ratio
                </p>
              </section>

              {isHigher ? (
                <section className="h-28 w-fit px-8 rounded-3xl border border-stone-900 bg-gradient-to-t from-stone-950 to-stone-900 flex flex-col justify-center items-center shadow-lg ">
                  <div className="text-xl text-teal-400 font-semibold">
                    <h1>{Math.abs(savingsDifference).toFixed(2)}% higher</h1>
                  </div>
                  <p className="text-sm text-stone-400 mt-2 text-center">
                    savings than the ideal rate.
                  </p>
                </section>
              ) : (
                <section className="h-28 w-fit px-8 rounded-3xl border border-stone-900 bg-gradient-to-t from-stone-950 to-stone-900 flex flex-col justify-center items-center shadow-lg ">
                  <div className="text-xl text-red-400 font-semibold">
                    <h1>{Math.abs(savingsDifference).toFixed(2)}% lower</h1>
                  </div>
                  <p className="text-sm text-stone-400 mt-2">
                    savings than the ideal rate.
                  </p>
                </section>
              )}
            </div>
          </div>
        </div>
      </section>
      <h2 className="text-stone-400 text-xl mt-10">
        Your category wise expenses
      </h2>
      <section className="h-fit flex flex-row justify-between  rounded-3xl border border-stone-900 bg-stone-950 p-4 mt-10 w-full cursor-pointer shadow-lg">
        <CategoryBarGraph
          categoryData={{
            entertainment: entCategory,
            bills: billCategory,
            groceries: groCategory,
            household: houseCategory,
          }}
        />
        <div className="flex flex-col gap-11 w-fit ml-2">
          <div className="flex gap-2">
            <section className="h-28 w-32 rounded-3xl border border-stone-900 bg-gradient-to-t from-stone-950 to-stone-900 flex flex-col justify-center items-center shadow-lg ">
              <h1 className="text-2xl text-red-400 font-semibold">
                {entCategory} ₹
              </h1>
              <p className="text-sm text-stone-400 mt-2">Entertainment</p>
            </section>
            <section className="h-28 w-32 rounded-3xl border border-stone-900 bg-gradient-to-t from-stone-950 to-stone-900 flex flex-col justify-center items-center shadow-lg ">
              <h1 className="text-2xl text-red-400 font-semibold">
                {billCategory} ₹
              </h1>
              <p className="text-sm text-stone-400 mt-2">Bills</p>
            </section>
            <section className="h-28 w-32 rounded-3xl border border-stone-900 bg-gradient-to-t from-stone-950 to-stone-900 flex flex-col justify-center items-center shadow-lg ">
              <h1 className="text-2xl text-red-400 font-semibold">
                {groCategory} ₹
              </h1>
              <p className="text-sm text-stone-400 mt-2">Groceries</p>
            </section>
            <section className="h-28 w-32 rounded-3xl border border-stone-900 bg-gradient-to-t from-stone-950 to-stone-900 flex flex-col justify-center items-center shadow-lg ">
              <h1 className="text-2xl text-red-400 font-semibold">
                {houseCategory} ₹
              </h1>
              <p className="text-sm text-stone-400 mt-2">Household</p>
            </section>
          </div>
          <div className="flex flex-col">
            <h2 className="text-stone-400 text-lg mt-6 mb-4 flex justify-center">
              Category wise contribution (%) to total expense
            </h2>
            <div className="flex gap-2">
              <section className="h-28 w-32 rounded-3xl border border-stone-900 bg-gradient-to-t from-stone-950 to-stone-900 flex flex-col justify-center items-center shadow-lg ">
                <h1 className="text-2xl text-red-400 font-semibold">
                  {entCategoryRatio}
                </h1>
                <p className="text-sm text-stone-400 mt-2">Household</p>
              </section>
              <section className="h-28 w-32 rounded-3xl border border-stone-900 bg-gradient-to-t from-stone-950 to-stone-900 flex flex-col justify-center items-center shadow-lg ">
                <h1 className="text-2xl text-red-400 font-semibold">
                  {billCategoryRatio}
                </h1>
                <p className="text-sm text-stone-400 mt-2">Household</p>
              </section>
              <section className="h-28 w-32 rounded-3xl border border-stone-900 bg-gradient-to-t from-stone-950 to-stone-900 flex flex-col justify-center items-center shadow-lg ">
                <h1 className="text-2xl text-red-400 font-semibold">
                  {groCategoryRatio}
                </h1>
                <p className="text-sm text-stone-400 mt-2">Household</p>
              </section>
              <section className="h-28 w-32 rounded-3xl border border-stone-900 bg-gradient-to-t from-stone-950 to-stone-900 flex flex-col justify-center items-center shadow-lg ">
                <h1 className="text-2xl text-red-400 font-semibold">
                  {houseCategoryRatio}
                </h1>
                <p className="text-sm text-stone-400 mt-2">Household</p>
              </section>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-8 mb-4 flex flex-col justify-center items-center gap-4">
        <button
          className="border border-stone-900 px-4 py-1 rounded-xl flex gap-2 shadow-md shadow-lime-950 hover:border-lime-950 hover:shadow-none transform delay-100 w-fit"
          // onClick={generateInsights}   //turn off the comment to hit the gemini ai. Turned off to avoid unnecessary api calls
        >
          <img src={ailogo} alt="" />
          <p className="text-lg font-new text-stone-400 ">Get AI Insights</p>
        </button>
        <section className="w-full border border-stone-900 rounded-2xl flex flex-col p-2 px-4">
          <div className="flex gap-2 px-2 py-1 w-fit">
            <img src={ailogo} alt="" />
            <p className="text-lg font-new text-lime-600">AI Insight</p>
          </div>
          <h1 className="text-stone-500 text-base">{insight}</h1>
        </section>
      </section>
    </>
  );
};

export default Analytics;
