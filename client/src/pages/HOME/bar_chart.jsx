import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

export default function Bar_Chart() {
  const transactions = useSelector((state) => state.transactions).transactions;
  const income = Array(12).fill(0);
  const expense = Array(12).fill(0);
  const investment = Array(12).fill(0);

  // Process each transaction
  transactions.forEach((transaction) => {
    const timestamp = parseInt(transaction.date, 10); // Ensure the timestamp is treated as an integer
    const date = new Date(timestamp); // Create a Date object from the timestamp
    const month = date.getMonth(); // Get month index (0 = January, 11 = December)
    switch (transaction.category) {
      case "income":
        income[month] += transaction.amount;
        break;
      case "expense":
        expense[month] += transaction.amount;
        break;
      case "investment":
        investment[month] += transaction.amount;
        break;
      default:
        break;
    }
  });

  const state = {
    series: [
      {
        name: "Income",
        data: income,
      },
      {
        name: "Expense",
        data: expense,
      },
      {
        name: "Investment",
        data: investment,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#77B6EA", "#FF4560", "#9DDE8B"], // Added color for Investment
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth", // Changed to "smooth" for a smoother line
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // Takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        title: {
          text: "Month",
        },
      },
      yaxis: {
        title: {
          text: "Amount", // Updated Y-axis title
        },
        min: 0, // Updated min value for better scaling
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  };

  return <ReactApexChart style={{ width: "90vw", maxWidth: "450px" }} options={state.options} series={state.series} type="line" height={350} />;
}
