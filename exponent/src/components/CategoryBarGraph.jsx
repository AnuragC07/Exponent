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

const CategoryLineGraph = ({ categoryData }) => {
  const labels = ["Ent.", "Bills", "Groc.", "Househld."];
  const data = {
    labels,
    datasets: [
      {
        label: "Ent.",
        data: [categoryData.entertainment, 0, 0, 0],
        borderColor: "#a78bfa", // Purple
        backgroundColor: "rgba(167, 139, 250, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: "#a78bfa",
        pointHoverBackgroundColor: "#a78bfa",
        pointBorderColor: "#ffffff",
        pointHoverBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
      {
        label: "Bills",
        data: [0, categoryData.bills, 0, 0],
        borderColor: "#67e8f9", // Cyan
        backgroundColor: "rgba(103, 232, 249, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: "#67e8f9",
        pointHoverBackgroundColor: "#67e8f9",
        pointBorderColor: "#ffffff",
        pointHoverBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
      {
        label: "Groc.",
        data: [0, 0, categoryData.groceries, 0],
        borderColor: "#f472b6", // Pink
        backgroundColor: "rgba(244, 114, 182, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: "#f472b6",
        pointHoverBackgroundColor: "#f472b6",
        pointBorderColor: "#ffffff",
        pointHoverBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
      {
        label: "Househld.",
        data: [0, 0, 0, categoryData.household],
        borderColor: "#86efac", // Green
        backgroundColor: "rgba(134, 239, 172, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: "#86efac",
        pointHoverBackgroundColor: "#86efac",
        pointBorderColor: "#ffffff",
        pointHoverBorderColor: "#ffffff",
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
        backgroundColor: "rgba(21, 30, 58, 0.63)",
        titleColor: "#e2e8f0",
        bodyColor: "#e2e8f0",
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ₹${context.raw || 0} ₹`,
        },
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
    <div className="w-1/2 bg-stone-950 rounded-lg p-6">
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CategoryLineGraph;
