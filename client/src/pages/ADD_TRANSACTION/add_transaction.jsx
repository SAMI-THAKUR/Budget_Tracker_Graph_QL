import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { CREATE_TRANSACTION } from "../../graphql/mutations/transaction.mutation.js";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { addTransaction } from "../../feature/transaction.js";
import { useNavigate } from "react-router-dom";

export default function Add_Transaction() {
  const transactions = useSelector((state) => state.transactions).transactions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [category, setCategory] = useState("expense");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    onError: (error) => {
      console.error("Transaction creation error:", error);
    },
    onCompleted: (data) => {
      dispatch(addTransaction(data.createTransaction));
      navigate("/transactions");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
      paymentType: paymentType,
      category: category,
    };
    console.log(formData);
    createTransaction({
      variables: {
        input: formData,
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                    Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
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
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    name="amount"
                    id="amount"
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
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    name="date"
                    id="date"
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
              <div className="flex items-center space-x-6">
                {["cash", "card", "bank_transfer", "cheque", "upi"].map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="paymentType"
                      id={`radio-${type}`}
                      className="h-5 w-5"
                      value={type}
                      onChange={(e) => setPaymentType(e.target.value)}
                      required
                    />
                    <label htmlFor={`radio-${type}`} className="pl-3 text-base font-medium text-[#07074D]">
                      {type.charAt(0).toUpperCase() + type.slice(1).replace("_", " ")}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
