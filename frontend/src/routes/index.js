import { Route, Routes } from "react-router-dom";
import GuestOnlyRoute from "../components/GuestOnlyRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import GuardOnlyRoute from "../components/GuardRoute";
import AccountSalesAdd from "../pages/AccountSales/AccountSalesAdd";
import AccountSales from "../pages/AccountSales/AccountSales";
import Products from "../pages/Products/Products";
import ProductsAdd from "../pages/Products/ProductsAdd";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestOnlyRoute>
            <Login />
          </GuestOnlyRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <GuardOnlyRoute>
            <Dashboard />
          </GuardOnlyRoute>
        }
      />

      <Route
        path="/account-sales"
        element={
          <GuardOnlyRoute>
            <AccountSales />
          </GuardOnlyRoute>
        }
      />

      <Route
        path="/account-sales/add"
        element={
          <GuardOnlyRoute>
            <AccountSalesAdd />
          </GuardOnlyRoute>
        }
      />

      <Route
        path="/products"
        element={
          <GuardOnlyRoute>
            <Products />
          </GuardOnlyRoute>
        }
      />

      <Route
        path="/products/add"
        element={
          <GuardOnlyRoute>
            <ProductsAdd />
          </GuardOnlyRoute>
        }
      />
    </Routes>
  );
}
