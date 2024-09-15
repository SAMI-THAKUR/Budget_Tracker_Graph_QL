import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Provider } from "react-redux";
import store from "./store.js";
import "./index.css";

// Create httpLink for the GraphQL endpoint
const httpLink = new HttpLink({
  uri: "https://budget-tracker-graph-ql-bo9k.vercel.app/graphql",
  credentials: "include", // Ensure cookies like connect.sid are included with requests
});

// Create authLink to set headers, including the connect.sid cookie
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

// Combine authLink with httpLink
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine authLink and httpLink
  cache: new InMemoryCache(),
});

// Render the React app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </StrictMode>,
);
