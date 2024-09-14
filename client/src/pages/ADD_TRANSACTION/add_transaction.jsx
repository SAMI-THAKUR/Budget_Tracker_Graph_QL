import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { CREATE_TRANSACTION } from "../../graphql/mutations/transaction.mutation.js";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { addTransaction } from "../../feature/transaction.js";

export default function Add_Transaction() {
  let transactions = useSelector((state) => state.transactions).transactions;
  const dispatch = useDispatch();
  console.log(transactions);
  const [category, setCategory] = useState("expense");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    onError: (error) => {
      console.error("Sign up error:", error);
    },
    onCompleted: (data) => {
      dispatch(addTransaction(data.createTransaction));
      // console.log(data);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Formdata = {
      name: name,
      amount: parseFloat(amount),
      date: date,
      paymentType: paymentType,
      category: category,
    };
    console.log(Formdata);
    createTransaction({
      variables: {
        input: Formdata,
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form action="#" method="POST">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label htmlFor="fName" className="mb-3 block text-base font-medium text-[#07074D]">
                    Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="fName"
                    id="fName"
                    placeholder="First Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label htmlFor="lName" className="mb-3 block text-base font-medium text-[#07074D]">
                    Amount
                  </label>
                  <input
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    name="lName"
                    id="lName"
                    placeholder="Last Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <label className="mb-3 block text-base font-medium text-[#07074D]">Expense Category</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{category}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" sideOffset={5}>
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
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="radio1"
                    id="radioButton1"
                    className="h-5 w-5"
                    value="cash"
                    onChange={(e) => setPaymentType(e.target.value)}
                  />
                  <label htmlFor="radioButton1" className="pl-3 text-base font-medium text-[#07074D]">
                    Cash
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="radio1"
                    id="radioButton2"
                    className="h-5 w-5"
                    value="card"
                    onChange={(e) => setPaymentType(e.target.value)}
                  />
                  <label htmlFor="radioButton2" className="pl-3 text-base font-medium text-[#07074D]">
                    Card
                  </label>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={handleSubmit}
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
