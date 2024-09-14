import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "./graphql/query/user.query";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// redux //
import { useDispatch } from "react-redux";
import { setUser } from "./feature/user.js";

const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loading: authLoading,
    error: authError,
    data: authData,
  } = useQuery(GET_AUTH_USER, {
    onError: (error) => {
      console.error("Sign up error:", error);
    },
  });

  useEffect(() => {
    if (authData && authData.authUser) {
      dispatch(setUser(authData.authUser));
    }
  }, [authData, dispatch]);

  useEffect(() => {
    if (!authLoading) {
      if (authError) {
        console.error("Authentication error:", authError);
        navigate("/login");
      } else if (!authData || !authData.authUser) {
        console.warn("User is not authenticated.");
        navigate("/login");
      }
    }
  }, [authLoading, authError, authData, navigate]);

  if (authLoading) {
    return (
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
    );
  }
  return <div>{children}</div>;
};

export default ProtectedPage;
