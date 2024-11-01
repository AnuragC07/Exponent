import { useEffect, useState } from "react";
import axios from "axios";

const CurBalance = () => {
  const [amount, setAmount] = useState(0); // Store the amount as a single value

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const res = await axios.get("http://localhost:8000/api/total", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to request headers
          },
        });
        console.log(res.data);

        if (res.data.data && res.data.data.length > 0) {
          const firstEntryAmount = res.data.data[0].amount;
          setAmount(firstEntryAmount);
        }
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
