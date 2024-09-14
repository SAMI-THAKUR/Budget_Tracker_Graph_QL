import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import { setTransactions } from "../feature/transaction";
import { useDispatch } from "react-redux";
import { GET_TRANSACTION_ALL } from "../graphql/query/transaction.query";
import { useQuery } from "@apollo/client";
export default function Layout() {
  const dispatch = useDispatch();
  useQuery(GET_TRANSACTION_ALL, {
    onError: (error) => {
      console.error("Transaction fetch", error);
    },
    onCompleted: (data) => {
      dispatch(setTransactions(data.transactions));
    },
  });
  return (
    <div className="h-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
}
