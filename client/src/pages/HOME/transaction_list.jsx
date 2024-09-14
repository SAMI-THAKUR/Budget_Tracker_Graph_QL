import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";

export default function Transaction_List() {
  let transactions = useSelector((state) => state.transactions).transactions;
  transactions.slice(0, 5);
  return (
    <section className="container mx-auto  font-mono px-5  bg-main_bg">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto ">
          <table className="w-full">
            <thead>
              <tr className="text-sm sm:text-base font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b ">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Payment Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {transactions.map((transaction) => (
                <Row key={transaction.id} props={transaction} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Row(props) {
  const { amount, category, date, id, name, paymentType } = props.props;
  // Convert timestamp to a Date object
  const timestamp = parseInt(date, 10); // Ensure the timestamp is treated as an integer
  const formattedDate = new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  // Function to determine the color based on the category
  const getCategoryColor = (category) => {
    switch (category) {
      case "income":
        return "text-blue-700 bg-blue-100"; // Example for saving category
      case "expense":
        return "text-red-700 bg-red-100"; // Example for expense category
      case "investment":
        return "text-green-700 bg-green-100"; // Example for investment category
      default:
        return "text-gray-700 bg-gray-100"; // Default case
    }
  };

  return (
    <tr className="text-gray-700">
      <td className="px-4 py-3 border">
        <div className="flex items-center text-xs sm:text-sm">
          <p className="text-black">{name.toUpperCase()}</p>
        </div>
      </td>
      <td className="px-4 py-3 text-ms border">
        <div className="flex items-center text-xs sm:text-sm">
          <p className="text-black">{paymentType.toUpperCase()}</p>
        </div>
      </td>
      <td className="px-4 py-3 text-xs border">
        <span className={`px-2 py-1 font-semibold leading-tight rounded-sm text-xs sm:text-sm ${getCategoryColor(category)}`}>{amount}</span>
      </td>
      <td className="px-4 py-3 text-xs sm:text-sm border flex gap-5 justify-between">{formattedDate}</td>
    </tr>
  );
}
