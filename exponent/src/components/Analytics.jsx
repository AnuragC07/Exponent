import axios from "axios";
import { useEffect } from "react";


const Analytics = () => {

useEffect(() => {
    axios
    .get("http://localhost:8000/")
    .then((res) =>{
        console.log(res.data.data[0].type);
        console.log(res.data.data[0].amount);
        const result = res.data.data.filter(item => item.type === 'earning' || item.type === 'Earning');
        console.log(result);
        const totalEarnings = result.reduce((sum, item) => sum + item.amount, 0);
        console.log(totalEarnings)
    })
    .catch((err) => {
        console.log(err);
    });

}, []);



  return (
    <section className="h-72 bg-stone-700 rounded-3xl p-4 mt-8 w-full">
      <h1>Analytics</h1>
    </section>
  );
};

export default Analytics;
