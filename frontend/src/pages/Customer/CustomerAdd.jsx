import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import { getData, postData } from "../../utils/fetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Input from "../../components/Input/Input";
import SubmitButton from "../../components/Button/SubmitButton";
import SelectInput from "../../components/Input/SelectInput";
import FileInput from "../../components/Input/FileInput";

export default function CustomerAdd() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    nama: "",
    noHP: "",
    alamat: "",
    ktp: "",
    fotoBangunan: "",
    paket: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Anda yakin membuat customer ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const res = await postData(`/customer`, form, true);

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

        navigate("/customer");
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

  const fetchPaket = async () => {
    try {
      const res = await getData("/product");
      let data = [];
      res.data.forEach((element) => {
        data.push(element.namaPaket);
      });
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPaket();
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <h1 className="text-3xl">Add Customer</h1>

          <form
            class="mt-16 grid grid-cols-2 gap-5 justify-between"
            onSubmit={handleSubmit}
          >
            <Input
              type={"text"}
              label="Nama"
              id="nama"
              name="nama"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />
            <Input
              type={"text"}
              label="Nomor Telepon"
              id="noHP"
              name="noHP"
              placeholder="6289647755123"
              onChange={handleChange}
              required
            />
            <Input
              type={"text"}
              label="Alamat Pemasangan"
              id="alamat"
              name="alamat"
              placeholder="Alamat Lengkap"
              onChange={handleChange}
              required
            />
            <SelectInput
              id="paket"
              name={"paket"}
              label="Jenis Paket"
              options={products}
              onChange={handleChange}
            />
            <FileInput
              id="ktp"
              name="ktp"
              label="Foto KTP (Kartu Tanda Penduduk)"
              accept=".png, .jpg, .jpeg"
              helpText="PNG, JPG or JPEG"
              onChange={handleChangeFile}
            />
            <FileInput
              id="fotoBangunan"
              name="fotoBangunan"
              label="Foto Bangunan Pemasangan"
              accept=".png, .jpg, .jpeg"
              helpText="PNG, JPG or JPEG"
              onChange={handleChangeFile}
            />
            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  );
}
