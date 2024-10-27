import { useEffect, useState } from "react";
import axios from "axios";

const CurBalance = () => {
  const [amount, setAmount] = useState(0); // Store the amount as a single value

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/total");
        console.log(res); // Debugging: log the entire response
        console.log(res.data); // Debugging: log the data part

        // Access and set the amount from the response
        const firstEntryAmount = res.data.data[0].amount;
        setAmount(firstEntryAmount);
      } catch (error) {
        console.error("Error:", error.response?.data?.message || error.message);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-stone-200 font-semibold">{amount} ₹</h1>{" "}
      <p className="text-xs text-stone-400">Current Balance</p>
    </div>
  );
};

export default CurBalance;
