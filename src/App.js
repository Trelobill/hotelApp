import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "./components/TopNav";
import PrivateRoute from "./components/PrivateRoute";
//components
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./user/Dashboard";
import DashboardSeller from "./user/DashboardSeller";
import NewHotel from "./hotels/NewHotel";
import StripeCallback from "./stripe/StripeCallback";
import EditHotel from "./hotels/EditHotel";
import ViewHotel from "./hotels/ViewHotel";
import StripeSuccess from "./stripe/StripeSuccess";
import StripeCancel from "./stripe/StripeCancel";
import SearchResult from "./hotels/SearchResult";
import Scanner from "./components/Scanner";

function App() {
  const { auth } = useSelector((state) => ({ ...state }));
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer position="top-center" />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/login"
          element={
            window.localStorage.getItem("auth") ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          exact
          path="/register"
          element={
            window.localStorage.getItem("auth") ? (
              <Navigate to="/" replace />
            ) : (
              <Register />
            )
          }
        />
        <Route
          exact
          path="/qr-code"
          element={
            auth !== null && auth.user.stripe_account_id !== undefined ? (
              <PrivateRoute>
                <Scanner />
              </PrivateRoute>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/dashboard/seller"
          element={
            <PrivateRoute>
              <DashboardSeller />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/hotels/new"
          element={
            <PrivateRoute>
              <NewHotel />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/stripe/callback"
          element={
            <PrivateRoute>
              <StripeCallback />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/stripe/success/:hotelId"
          element={
            <PrivateRoute>
              <StripeSuccess />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/stripe/cancel"
          element={
            <PrivateRoute>
              <StripeCancel />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/hotel/edit/:hotelId"
          element={
            <PrivateRoute>
              <EditHotel />
            </PrivateRoute>
          }
        />
        <Route exact path="/hotel/:hotelId" element={<ViewHotel />} />
        <Route exact path="/search-result/" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
