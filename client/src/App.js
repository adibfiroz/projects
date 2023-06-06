import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Listing from "./pages/listing/Listing";
import ReadAllReview from "./pages/readallreview/ReadAllReview";
import WriteReview from "./pages/writereview/WriteReview";
import Categories from "./pages/categories/Categories";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import SoftwareSaved from "./pages/profile/SoftwareSaved";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ScrollToTop from "./ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Prewrite from "./pages/prewrite/Prewrite";

function App() {
  const queryClient = new QueryClient();

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const ProtectedUserRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="softwares" element={<Listing />} />
            <Route path="write-review/:id" element={<WriteReview />} />
            <Route path="categories" element={<Categories />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="software-saved"
              element={
                <ProtectedRoute>
                  <SoftwareSaved />
                </ProtectedRoute>
              }
            />
            <Route
              path="login"
              element={
                <ProtectedUserRoute>
                  <Login />
                </ProtectedUserRoute>
              }
            />
            <Route
              path="register"
              element={
                <ProtectedUserRoute>
                  <Register />
                </ProtectedUserRoute>
              }
            />
            <Route path="/:id-:id" element={<ReadAllReview />} />
            <Route
              path="selectSoftwares"
              element={
                <ProtectedRoute>
                  <Prewrite />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
