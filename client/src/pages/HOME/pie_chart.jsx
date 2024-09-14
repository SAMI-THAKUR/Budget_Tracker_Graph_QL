import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

export default function ChartPie() {
  let transactions = useSelector((state) => state.transactions).transactions;
  let income = 0;
  let expense = 0;
  let investment = 0;
  transactions.forEach((transaction) => {
    switch (transaction.category) {
      case "income":
        income += transaction.amount;
        break;
      case "expense":
        expense += transaction.amount;
        break;
      case "investment":
        investment += transaction.amount;
        break;
      default:
        break;
    }
  });
  const state = {
    series: [income, expense, investment],
    options: {
      chart: {
        type: "donut",
        height: 400, // Adjust height as needed
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 350,
            },
            legend: {
              position: "bottom",
            },
          },
        },
        {
          breakpoint: 1024,
          options: {
            chart: {
              height: 400,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      colors: ["#96C9F4", "#EF5A6F", "#9DDE8B"],
      labels: ["Income", "Expense", "Investment"],
    },
  };
  return (
    <ReactApexChart style={{ width: "90vw", maxWidth: "450px", fontcolor: "black" }} options={state.options} series={state.series} type="donut" />
  );
}
