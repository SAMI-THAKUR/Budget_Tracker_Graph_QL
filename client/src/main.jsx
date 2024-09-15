import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import store from "./store.js";

const client = new ApolloClient({
  // TODO => Update the uri on production
  uri: import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:4000/graphql" : "/graphql", // the URL of our GraphQL server.
  cache: new InMemoryCache(), // Apollo Client uses to cache query results after fetching them.
  credentials: "include", // This tells Apollo Client to send cookies along with every request to the server.
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);
