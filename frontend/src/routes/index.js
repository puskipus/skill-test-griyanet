import { Route, Routes } from "react-router-dom";
import GuestOnlyRoute from "../components/GuestOnlyRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import GuardOnlyRoute from "../components/GuardRoute";
import AccountSalesAdd from "../pages/AccountSales/AccountSalesAdd";
import AccountSales from "../pages/AccountSales/AccountSales";
import Products from "../pages/Products/Products";
import ProductsAdd from "../pages/Products/ProductsAdd";
import Forbidden from "../pages/Forbidden";
import GuardRoleRoute from "../components/GuardRoleRoute";
import Customer from "../pages/Customer/Customer";
import CustomerAdd from "../pages/Customer/CustomerAdd";

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
            <GuardRoleRoute role={"admin"}>
              <AccountSales />
            </GuardRoleRoute>
          </GuardOnlyRoute>
        }
      />

      <Route
        path="/account-sales/add"
        element={
          <GuardOnlyRoute>
            <GuardRoleRoute role={"admin"}>
              <AccountSalesAdd />
            </GuardRoleRoute>
          </GuardOnlyRoute>
        }
      />

      <Route
        path="/products"
        element={
          <GuardOnlyRoute>
            <GuardRoleRoute role={"admin"}>
              <Products />
            </GuardRoleRoute>
          </GuardOnlyRoute>
        }
      />

      <Route
        path="/products/add"
        element={
          <GuardOnlyRoute>
            <GuardRoleRoute role={"admin"}>
              <ProductsAdd />
            </GuardRoleRoute>
          </GuardOnlyRoute>
        }
      />

      <Route
        path="/customer"
        element={
          <GuardOnlyRoute>
            <GuardRoleRoute role={"sales"}>
              <Customer />
            </GuardRoleRoute>
          </GuardOnlyRoute>
        }
      />

      <Route
        path="/customer/add"
        element={
          <GuardOnlyRoute>
            <GuardRoleRoute role={"sales"}>
              <CustomerAdd />
            </GuardRoleRoute>
          </GuardOnlyRoute>
        }
      />

      <Route path="/forbidden" element={<Forbidden />} />
    </Routes>
  );
}
