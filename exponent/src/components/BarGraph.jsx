import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph = ({ data }) => {
  // Prepare the data for the chart
  const earnings = data.filter(
    (item) => item.type === "earning" || item.type === "Earning"
  );
  const expenses = data.filter(
    (item) => item.type === "expense" || item.type === "Expense"
  );

  // Extract labels (categories or descriptions) and amounts
  const labels = data.map((item) => {
    const date = new Date(item.date); // Convert the string to a Date object

    // Format the date to "16 Sep" using Intl.DateTimeFormat
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
    }).format(date);
  });
  const earningsAmounts = earnings.map((item) => item.amount);
  const expensesAmounts = expenses.map((item) => item.amount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Earnings",
        data: earningsAmounts,
        backgroundColor: "rgba(34, 139, 34, 0.6)", // Dark green
        borderColor: "rgba(34, 139, 34, 1)", // Dark green border
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: expensesAmounts,
        backgroundColor: "rgba(139, 0, 0, 0.6)", // Dark red
        borderColor: "rgba(139, 0, 0, 1)", // Dark red border
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Earnings and Expenses Overview",
        color: "grey",
        font: "light"
      },
    },
  };

  return (
    <div className=" w-1/2 h-1/2">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarGraph;
