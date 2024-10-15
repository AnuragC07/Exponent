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
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph = ({ data, currentMonth }) => {
  // Filter data accurately for the current month
  const filteredData = data.filter((item) =>
    dayjs(item.date).isSame(currentMonth, "month")
  );

  // Ensure dates are correctly parsed and sorted in ascending order
  const sortedData = filteredData.sort(
    (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
  );

  // Split sorted data into earnings and expenses
  const earnings = sortedData.filter(
    (item) => item.type.toLowerCase() === "earning"
  );
  const expenses = sortedData.filter(
    (item) => item.type.toLowerCase() === "expense"
  );

  // Extract labels and amounts correctly
  const labels = sortedData.map((item) => dayjs(item.date).format("DD MMM"));
  const earningsAmounts = sortedData.map((item) =>
    item.type.toLowerCase() === "earning" ? item.amount : 0
  );
  const expensesAmounts = sortedData.map((item) =>
    item.type.toLowerCase() === "expense" ? item.amount : 0
  );

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
        font: "light",
      },
    },
  };

  return (
    <div className="w-1/2 h-1/2">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarGraph;
