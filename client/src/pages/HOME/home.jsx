import ChartPie from "./pie_chart";
import Transaction_List from "./transaction_list";
import Bar_Chart from "./bar_chart";
import Stack_Chart from "./stack_bar";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user).user;
  const transactions = useSelector((state) => state.transactions).transactions;
  let income = 0;
  let expense = 0;
  let investment = 0;
  const currMonth = new Date().getMonth();
  transactions.forEach((transaction) => {
    const timestamp = parseInt(transaction.date, 10); // Ensure the timestamp is treated as an integer
    const date = new Date(timestamp); // Create a Date object from the timestamp
    const month = date.getMonth(); // Get month index (0 = January, 11 = December)

    // Check if the transaction is from the current month
    if (month !== currMonth) {
      return;
    }

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
  return (
    <div className="bg-main_bg w-full h-fit pb-10 py-10   sm:pl-[290px]">
      <h1 className="text-heading text-5xl sm:pl-0 pl-20 font-bold font-mono">Dashboard</h1>
      <div className="w-full flex gap-10 px-2 pt-3  items-center flex-wrap">
        <div className="bg-blue-100 w-fit px-2 h-14 rounded-lg shadow-lg flex flex-col items-center justify-center">Income</div>
        <div className="bg-red-100 w-fit px-2 h-14 rounded-lg shadow-lg flex flex-col items-center justify-center">Expense</div>
        <div className="bg-green-100 w-fit px-2 h-14 rounded-lg shadow-lg flex flex-col items-center justify-center">Investement</div>
      </div>
      <p className="text-text text-2xl sm:pl-0 pl-20 pt-10 font-medium mb-5 self-center font-mono">Your recent transactions</p>
      <Transaction_List />
      <p className="text-text text-2xl sm:pl-0 pl-20 font-medium my-5 w-fit font-mono self-center">This month transaction overview</p>
      <div className="w-full flex gap-10 px-2  items-center flex-wrap">
        <div className="bg-blue-100 w-60 h-60 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <p className="text-heading text-2xl font-bold font-mono">Income</p>
          <p className="text-blue-700 text-xl font-medium font-mono">Rs. {income}</p>
        </div>
        <div className="bg-red-100 w-60 h-60 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <p className="text-heading text-2xl font-bold font-mono">Expense</p>
          <p className="text-red-700 text-xl font-medium font-mono">Rs. {expense}</p>
        </div>
        <div className="bg-green-100 w-60 h-60 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <p className="text-heading text-2xl font-bold font-mono">Investment</p>
          <p className="text-green-700 text-xl font-medium font-mono">Rs. {investment}</p>
        </div>
      </div>
      <p className="text-text text-2xl sm:pl-0 pl-20 pt-10 font-medium my-5 w-fit font-mono self-center">Overall transaction overview</p>
      <div className="w-full flex gap-10 px-2 pt-3 items-center flex-wrap">
        <ChartPie />
        <Bar_Chart />
      </div>
      <Stack_Chart />
    </div>
  );
}
