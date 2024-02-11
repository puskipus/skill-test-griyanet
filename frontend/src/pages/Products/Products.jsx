import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import { Link } from "react-router-dom";
import AddButton from "../../components/Button/AddButton";

export default function Products() {
  return (
    <div>
      <Navbar />

      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl">Manage Products</h1>
            <AddButton to="/products/add" />
          </div>
        </div>
      </div>
    </div>
  );
}
