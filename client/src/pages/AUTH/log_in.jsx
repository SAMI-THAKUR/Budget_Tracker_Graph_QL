import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LOG_IN } from "../../graphql/mutations/user.mutation.js"; // GraphQL mutation
import { useMutation } from "@apollo/client"; // GraphQL lib
import { toast, ToastContainer } from "react-toastify"; // toast

// Toast notification htmlFor Error //
const showErrorToast = (error) => {
  const errorMessage = error.message || "An unexpected error occurred";
  toast.error(errorMessage, {
    position: "top-left",
  });
};
// Toast notification htmlFor Success //
const showSuccessToast = () => {
  toast.success("Welcome!", {
    position: "top-left",
  });
};

export default function Log_In() {
  // Form State //
  const [query, setquery] = useState("");
  const [password, setPassword] = useState("");
  // Navigation //
  const navigate = useNavigate();

  // Mutation Query //
  const [login, { loading }] = useMutation(LOG_IN, {
    onError: (error) => {
      console.error("Sign up error:", error);
      showErrorToast(error);
    },
    onCompleted: (data) => {
      showSuccessToast();
      // console.log(data);
      // dispatch(setUser(data.login)); // Use the dispatch variable here
      setTimeout(() => {
        navigate("/");
      }, 1000); // wait 2 seconds before navigating
    },
  });

  // Handle Submit //
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Formdata = {
      username: query,
      password: password,
    };
    await login({
      variables: {
        input: Formdata,
      },
    });
  };

  return (
    <div className="bg-darkbg min-h-screen flex items-center justify-center ">
      <div className="bg-bg p-8 rounded shadow-md max-w-md w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-4 font-Konkhmer">Log In</h2>
        <form action="#" method="POST">
          <div className="mt-4 font-Konkhmer">
            <label htmlFor="data" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input id="data" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => setquery(e.target.value)} />
          </div>

          <div className="mt-4 font-Konkhmer">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-start my-4">
            <NavLink to="/signup" className="text-sm text-indigo-800 font-robo  tracking-wide">
              Create an account
            </NavLink>
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-Konkhmer" onClick={handleSubmit}>
              Log In
            </button>
          </div>
        </form>
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
}
