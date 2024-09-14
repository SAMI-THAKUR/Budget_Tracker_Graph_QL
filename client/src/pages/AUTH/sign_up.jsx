import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useMutation } from "@apollo/client"; // GraphQL mutation
import { SIGN_UP } from "../../graphql/mutations/user.mutation"; // GrapQL mutation
import { toast, ToastContainer } from "react-toastify"; // Toast
import "react-toastify/dist/ReactToastify.css";

const showErrorToast = (error) => {
  const errorMessage = error.message || "An unexpected error occurred";
  toast.error(errorMessage, {
    position: "top-left",
  });
};

const showSuccessToast = () => {
  toast.success("Success Notification!", {
    position: "top-center",
  });
};

export default function Sign_Up() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("Male");
  const navigate = useNavigate();

  const [signUp, { loading }] = useMutation(SIGN_UP, {
    onError: (error) => {
      console.error("Sign up error:", error);
      showErrorToast(error);
    },
    onCompleted: (data) => {
      showSuccessToast();
      navigate("/");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Formdata = {
      name: name,
      username: username,
      gender: position,
      password: password,
    };

    try {
      await signUp({
        variables: {
          input: Formdata,
        },
      });
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="bg-darkbg min-h-screen flex items-center justify-center ">
      <div className="bg-bg p-8 rounded shadow-md max-w-md w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-4 font-Konkhmer tracking-wider">Welcom to Thread</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="font-Konkhmer">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input type="text" id="name" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="font-Konkhmer">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                User Name
              </label>
              <input type="text" id="username" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => setUsername(e.target.value)} />
            </div>
          </div>
          <div className="w-full sm:w-1/2 mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-4">Gender</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{position}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" sideOffset={5}>
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  <DropdownMenuRadioItem value="Male">Male</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Female">Female</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-4 font-Konkhmer">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" id="password" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="flex items-center justify-start my-4">
            <NavLink to="/login" className="text-sm text-indigo-800 font-robo  tracking-wide">
              Already have an account?
            </NavLink>
          </div>
          <div className="mt-6">
            <button
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-Konkhmer"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
}
