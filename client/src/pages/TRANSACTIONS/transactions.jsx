import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

export default function Transactions() {
  const transactions = useSelector((state) => state.transactions.transactions);

  // State for sorting and filtering
  const [sortOrder, setSortOrder] = useState("desc");
  const [filters, setFilters] = useState({
    category: "",
    paymentType: "",
    date: "",
    search: "",
  });
  const transactionDate = new Date(parseInt("1715856000000", 10)).toISOString().split("T")[0];
  console.log(new Date(filters.date).toDateString());
  console.log(transactionDate);
  // Memoized filtered and sorted transactions
  const filteredAndSortedTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        const categoryMatch = !filters.category || transaction.category === filters.category;
        const paymentTypeMatch = !filters.paymentType || transaction.paymentType === filters.paymentType;

        // Date filtering logic
        const transactionDate = new Date(parseInt(transaction.date, 10));
        const filterDate = filters.date ? new Date(filters.date) : null;

        const dateMatch = !filterDate || transactionDate.toDateString() === filterDate.toDateString();

        const searchMatch =
          !filters.search ||
          transaction.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          transaction.amount.toString().includes(filters.search);

        return categoryMatch && paymentTypeMatch && dateMatch && searchMatch;
      })
      .sort((a, b) => {
        const dateA = new Date(parseInt(a.date, 10));
        const dateB = new Date(parseInt(b.date, 10));
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [transactions, sortOrder, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <section className="container mx-auto py-36 font-mono px-5 sm:pl-[290px]">
      <div className="w-full flex gap-10 px-2 pt-3 mb-10 items-center flex-wrap">
        <div className="bg-blue-100 text-blue-700 w-fit px-2 h-14 rounded-lg shadow-lg flex flex-col items-center justify-center">Income</div>
        <div className="bg-red-100 text-red-700 w-fit px-2 h-14 rounded-lg shadow-lg flex flex-col items-center justify-center">Expense</div>
        <div className="bg-green-100 text-green-700 w-fit px-2 h-14 rounded-lg shadow-lg flex flex-col items-center justify-center">Investment</div>
      </div>

      {/* Sorting and Filtering UI */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border rounded p-2">
          <option value="desc">Sort by Date (Newest First)</option>
          <option value="asc">Sort by Date (Oldest First)</option>
        </select>

        <select name="category" value={filters.category} onChange={handleFilterChange} className="border rounded p-2">
          <option value="">All Categories</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="investment">Investment</option>
        </select>

        <select name="paymentType" value={filters.paymentType} onChange={handleFilterChange} className="border rounded p-2">
          <option value="">All Payment Types</option>
          <option value="card">Card</option>
          <option value="cash">Cash</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="cheque">Cheque</option>
          <option value="upi">UPI</option>
        </select>

        <input type="date" name="date" value={filters.date} onChange={handleFilterChange} className="border rounded p-2" />

        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search transactions..."
          className="border rounded p-2"
        />
      </div>

      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm sm:text-base font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Payment Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredAndSortedTransactions.map((transaction) => (
                <Row key={transaction._id} props={transaction} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Row({ props }) {
  const { amount, category, date, _id, name, paymentType } = props;

  const formattedDate = new Date(parseInt(date, 10)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case "income":
        return "text-blue-700 bg-blue-100";
      case "expense":
        return "text-red-700 bg-red-100";
      case "investment":
        return "text-green-700 bg-green-100";
      default:
        return "text-gray-700 bg-gray-100";
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
      <td className="px-4 py-3 text-xs sm:text-sm border flex gap-5 justify-between">
        {formattedDate}
        <NavLink to={`/update/${_id}`}>
          <Icon icon="bi:arrow-right" className="text-blue-700" />
        </NavLink>
      </td>
    </tr>
  );
}
