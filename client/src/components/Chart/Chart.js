import React from "react";
import { Doughnut } from "react-chartjs-2";

function Chart({ totalExpense, totalIncome }) {
  const data = {
    labels: ["Tổng chi", "Tổng thu"],
    datasets: [
      {
        data: [totalExpense, totalIncome],
        backgroundColor: [
          "rgba(255, 159, 64, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: ["rgba(255, 159, 64, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Doughnut
        data={data}
        width={250}
        height={250}
        options={{ maintainAspectRatio: false }}
      />
    </>
  );
}

export default Chart;
