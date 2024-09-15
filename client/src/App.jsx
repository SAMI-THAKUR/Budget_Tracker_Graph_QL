import Layout from "./layout/layout";
import { Home, Transactions, Add_Transaction, Sign_Up, Log_In, Update_Transaction } from "./pages/pages";
import ProtectedPage from "./protectedPage";
import { Route, RouterProvider, BrowserRouter, Routes } from "react-router-dom";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Layout />
              </ProtectedPage>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="add-transaction" element={<Add_Transaction />} />
            <Route path="update/:id" element={<Update_Transaction />} />
          </Route>
          <Route path="signup" element={<Sign_Up />} />
          <Route path="login" element={<Log_In />} />
        </Routes>
      </BrowserRouter>
      ,
    </>
  );
};

export default App;
