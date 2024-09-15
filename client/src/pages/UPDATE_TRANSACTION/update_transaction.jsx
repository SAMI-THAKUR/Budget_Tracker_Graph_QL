import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_TRANSACTION, UPDATE_TRANSACTION } from "../../graphql/mutations/transaction.mutation";
import { useMutation } from "@apollo/client";
import { deleteTransaction, updateTransaction } from "../../feature/transaction.js";
import { useNavigate } from "react-router-dom";

export default function Update_Transaction() {
  const navigate = useNavigate();
  const { id } = useParams();
  const transactions = useSelector((state) => state.transactions).transactions;
  const dispatch = useDispatch();
  const [transaction, setTransaction] = useState(null);
  const [category, setCategory] = useState("expense");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const [deleteTransactionQuery] = useMutation(DELETE_TRANSACTION, {
    onError: (error) => {
      console.error("Delete error:", error);
    },
    onCompleted: () => {
      dispatch(deleteTransaction(id));
      navigate("/transactions");
    },
  });

  const [updateTransactionQuery] = useMutation(UPDATE_TRANSACTION, {
    onError: (error) => {
      console.error("Update error:", error);
    },
    onCompleted: (data) => {
      dispatch(updateTransaction(data.updateTransaction));
      navigate("/transactions");
    },
  });

  useEffect(() => {
    const foundTransaction = transactions.find((transaction) => transaction._id === id);
    if (foundTransaction) {
      const formattedDate = new Date(parseInt(foundTransaction.date, 10)).toISOString().split("T")[0];
      setTransaction(foundTransaction);
      setName(foundTransaction.name || "");
      setAmount(foundTransaction.amount || "");
      setDate(formattedDate || "");
      setCategory(foundTransaction.category || "expense");
      setPaymentType(foundTransaction.paymentType || "");
    }
  }, [id, transactions]);

  if (!transaction) {
    return <div>Error: Transaction not found</div>;
  }

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedTransactionData = {
      transactionId: id,
      name,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
      category,
      paymentType,
    };

    updateTransactionQuery({
      variables: {
        input: updatedTransactionData,
      },
    });
  };

  const handleDelete = () => {
    deleteTransactionQuery({
      variables: {
        transactionId: id,
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleUpdate}>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Transaction Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    required
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label htmlFor="amount" className="mb-3 block text-base font-medium text-[#07074D]">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    required
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <label className="mb-3 block text-base font-medium text-[#07074D]">Category</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{category}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
                      <DropdownMenuRadioItem value="income">Income</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="expense">Expense</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="investment">Investment</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">Payment Type</label>
              <div className="flex items-center space-x-6 flex-wrap">
                {["cash", "card", "bank_transfer", "cheque", "upi"].map((type) => (
                  <div key={type} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="paymentType"
                      id={`radio-${type}`}
                      checked={paymentType === type}
                      onChange={() => setPaymentType(type)}
                      className="h-5 w-5"
                      value={type}
                      required
                    />
                    <label htmlFor={`radio-${type}`} className="pl-3 text-base font-medium text-[#07074D]">
                      {type.charAt(0).toUpperCase() + type.slice(1).replace("_", " ")}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-10">
              <button
                type="submit"
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="hover:shadow-form rounded-md bg-[#f16464] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
