import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import store from "./store.js";
import "./index.css";

const client = new ApolloClient({
  uri: "https://budget-tracker-graph-ql.vercel.app/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </StrictMode>,
);
``;
