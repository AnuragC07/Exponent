// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import dayjs from "dayjs";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineGraph = ({ data, currentMonth }) => {
  // Your original data processing logic
  const filteredData = data.filter((item) =>
    dayjs(item.date).isSame(currentMonth, "month")
  );

  const sortedData = filteredData.sort(
    (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
  );

  const labels = sortedData.map((item) => dayjs(item.date).format("DD MMM"));
  const earningsAmounts = sortedData.map((item) =>
    item.type.toLowerCase() === "earning" ? item.amount : 0
  );
  const expensesAmounts = sortedData.map((item) =>
    item.type.toLowerCase() === "expense" ? item.amount : 0
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Earnings",
        data: earningsAmounts,
        borderColor: "rgba(39, 245, 217, 0.89)", // Purple
        backgroundColor: "rgba(39, 245, 217, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: "rgba(56, 255, 199, 0.2)",
        pointHoverBackgroundColor: "rgba(56, 255, 199, 0.8)",
        pointBorderColor: "rgba(56, 255, 199, 0.8)",
        pointHoverBorderColor: "rgba(56, 255, 199, 0.8)",
        pointBorderWidth: 2,
      },
      {
        label: "Expenses",
        data: expensesAmounts,
        borderColor: "rgba(255, 99, 99, 0.8)", // Cyan
        backgroundColor: "rgba(255, 99, 99, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: "rgba(255, 99, 99, 0.2)",
        pointHoverBackgroundColor: "rgba(255, 99, 99, 0.8)",
        pointBorderColor: "rgba(255, 99, 99, 0.8)",
        pointHoverBorderColor: "rgba(255, 99, 99, 0.8)",
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          boxWidth: 8,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          color: "#94a3b8",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#1e293b",
        titleColor: "#e2e8f0",
        bodyColor: "#e2e8f0",
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#64748b",
          font: {
            size: 12,
          },
          padding: 8,
        },
      },
      y: {
        position: "right",
        border: {
          display: false,
        },
        grid: {
          color: "rgba(51, 65, 85, 0.5)",
          drawBorder: false,
          borderDash: [5, 5],
        },
        ticks: {
          color: "#64748b",
          font: {
            size: 12,
          },
          padding: 12,
          callback: (value) => `${value} ₹`,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    elements: {
      line: {
        cubicInterpolationMode: "monotone",
      },
    },
  };

  return (
    <div className="w-full bg-stone-950 rounded-lg px-6">
      <div className="h-[300px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineGraph;
