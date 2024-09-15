import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LOG_OUT } from "../graphql/mutations/user.mutation.js";
import { useMutation } from "@apollo/client";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
// redux //
import { useSelector } from "react-redux";

const showErrorToast = (error) => {
  const errorMessage = error.message || "An unexpected error occurred";
  toast.error(errorMessage, {
    position: "top-left",
  });
};

const showSuccessToast = () => {
  toast.success("Logged Out!", {
    position: "top-left",
  });
};
export default function Sidebar() {
  const user = useSelector((state) => state.user).user;
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [logout, { loading }] = useMutation(LOG_OUT, {
    onError: (error) => {
      console.error("Sign up error:", error);
      showErrorToast(error);
    },
    onCompleted: (data) => {
      showSuccessToast();
      setTimeout(() => {
        navigate("/login");
      }, 1000); // wait 2 seconds before navigating
    },
  });

  const Logout = async () => {
    await logout();
  };
  return (
    <>
      <aside className={`${open ? "bg-sec_bg" : "bg-transparent"} sm:bg-sec_bg  fixed px-3 py-4 left-0 overflow-hidden h-[100vh] z-50`}>
        <button
          onClick={() => setOpen(!open)}
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 mb-3 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-white "
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <div
          id="default-sidebar"
          className={` ${
            open ? "translate-x-0" : "-translate-x-[110%]"
          } "transition-transform py-3   flex flex-col justify-between bg-sec_bg   sm:translate-x-0 "`}
          aria-label="Sidebar"
        >
          <div>
            <ul className="space-y-2 font-medium">
              <li className="text-heading font-mono font-bold text-3xl mb-10 mx-auto">
                <span className="ms-3">Welcome {user.username}</span>
              </li>
              <li className="text-heading font-mono font-bold text-3xl mb-10 mx-auto">
                <span className="ms-3">Money Map</span>
              </li>
              <li>
                <Link to={"/"} className="flex items-center p-2 text-text rounded-lg  hover:bg-white  group">
                  <Icon icon="mdi:graph-box" />
                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to={"/transactions"} className="flex items-center p-2 text-text rounded-lg  hover:bg-white  group">
                  <Icon icon="grommet-icons:transaction" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Transactions</span>
                </Link>
              </li>

              <li>
                <Link to={"/add-transaction"} className="flex items-center p-2 text-text rounded-lg  hover:bg-white  group">
                  <Icon icon="basil:add-solid" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Add Transactions</span>
                </Link>
              </li>
              <li>
                <button onClick={Logout} className="flex items-center p-2 text-red-500 rounded-lg  hover:bg-white  group">
                  <Icon icon="streamline:logout-1-solid" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                </button>
              </li>
              <li>
                <div className="flex items-center gap-4 mt-10 bg-slate-300 p-2 rounded-md">
                  <img className="w-10 h-10 rounded-full font-mono" src={user.profilePic} alt="" />
                  <div className="font-medium text-text">
                    <div>{user.name}</div>
                    <div className="text-xs text-text">{user.username}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <ToastContainer autoClose={2000} />
    </>
  );
}
