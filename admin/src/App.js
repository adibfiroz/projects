import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import { softwareInputs } from "./formsource.js";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  categoryColumns,
  reviewColumns,
  softwareColumns,
  userColumns,
} from "./datatablesource";
import NewSoftware from "./pages/newsoftware/NewSoftware";
import NewCategory from "./pages/newcategory/NewCategory.";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="users">
            <Route index element={<List columns={userColumns} />} />
          </Route>
          <Route path="software">
            <Route index element={<List columns={softwareColumns} />} />
            <Route
              path="new"
              element={
                <NewSoftware inputs={softwareInputs} title="Add New Software" />
              }
            />
          </Route>
          <Route path="categories">
            <Route index element={<List columns={categoryColumns} />} />
            <Route
              path="new"
              element={<NewCategory title="Add New Category" />}
            />
          </Route>
          <Route path="reviews">
            <Route index element={<List columns={reviewColumns} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
