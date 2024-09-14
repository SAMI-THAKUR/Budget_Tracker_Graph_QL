import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

export default function Stack_Chart() {
  const transactions = useSelector((state) => state.transactions).transactions;
  let cash = Array(12).fill(0);
  let card = Array(12).fill(0);
  // Process each transaction
  transactions.forEach((transaction) => {
    const timestamp = parseInt(transaction.date, 10); // Ensure the timestamp is treated as an integer
    const date = new Date(timestamp); // Create a Date object from the timestamp
    const month = date.getMonth(); // Get month index (0 = January, 11 = December)
    switch (transaction.paymentType) {
      case "card":
        card[month] += transaction.amount;
        break;
      case "cash":
        cash[month] += transaction.amount;
        break;
      default:
        break;
    }
  });
  const state = {
    series: [
      {
        name: "Card Payments",
        data: cash,
      },
      {
        name: "Cash Payments",
        data: card,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
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
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          borderRadiusApplication: "end", // 'around', 'end'
          borderRadiusWhenStacked: "last", // 'all', 'last'
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        type: "category", // Changed from "datetime" to "category" for better readability with the new data
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
      grid: {
        borderColor: "#e7e7e7",
      },
    },
  };
  return <ReactApexChart style={{ width: "80vw", maxWidth: "800px" }} options={state.options} series={state.series} type="bar" height={400} />;
}
