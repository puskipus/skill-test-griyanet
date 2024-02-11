import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import { postData } from "../../utils/fetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SubmitButton from "../../components/Button/SubmitButton";
import Input from "../../components/Input/Input";

export default function ProductsAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    namaPaket: "",
    fitur: "",
    harga: "",
    kecepatanInternet: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Anda yakin membuat produk ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const res = await postData(`/product/create`, form);

      if (res?.data?.message) {
        toast.success(res?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        navigate("/products");
      } else {
        toast.error(res?.response?.data?.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <h1 className="text-3xl">Add Products</h1>

          <form class="max-w-sm mt-16" onSubmit={handleSubmit}>
            <Input
              type={"text"}
              label="Nama Paket"
              id="namaPaket"
              name="namaPaket"
              placeholder="Home 1"
              onChange={handleChange}
              required
            />
            <Input
              type={"number"}
              label="Kecepatan Internet (Mbps)"
              id="kecepatanInternet"
              name="kecepatanInternet"
              placeholder="50"
              onChange={handleChange}
              required
            />
            <Input
              type={"text"}
              label="Fitur (Pisahkan fitur dengan tanda ,)"
              id="fitur"
              name="fitur"
              placeholder="Unlimited, ....."
              onChange={handleChange}
              required
            />
            <Input
              type={"text"}
              label="Harga"
              id="harga"
              name="harga"
              placeholder="299.000"
              onChange={handleChange}
              required
            />
            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  );
}
