import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "./graphql/query/user.query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      console.error("Authentication error:", error);
      navigate("/login");
    },
  });

  useEffect(() => {
    if (!authLoading) {
      if (authData?.authUser) {
        dispatch(setUser(authData.authUser));
      } else {
        console.log(authData);
        console.warn("User is not authenticated.");
        navigate("/login");
      }
    }
  }, [authLoading, authData, navigate, dispatch]);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (authError) {
    return <div>Error: {authError.message}</div>;
  }

  return <div>{children}</div>;
};

export default ProtectedPage;
