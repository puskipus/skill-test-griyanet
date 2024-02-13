import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import { getData, postData, putData } from "../../utils/fetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Input from "../../components/Input/Input";
import SubmitButton from "../../components/Button/SubmitButton";
import SelectInput from "../../components/Input/SelectInput";
import FileInput from "../../components/Input/FileInput";
import { useParams } from "react-router-dom";

export default function CustomerUpdate() {
  const { id } = useParams();
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

  const [img, setImg] = useState({
    fotoBangunan: "",
    ktp: "",
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
      title: "Anda yakin mengupdate customer ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const res = await postData(`/customer/update/${id}`, form, true);

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

  const fetchCustomer = async () => {
    try {
      const res = await getData(`/customer/${id}`);
      const {
        nama = "",
        noHP = "",
        alamat = "",
        ktp = "",
        fotoBangunan = "",
        paket = "",
      } = res.data[0];

      setForm({ nama, noHP, alamat, paket });
      setImg({ ktp, fotoBangunan });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPaket();
    fetchCustomer();
  }, []);

  console.log(img);
  console.log(form);

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <h1 className="text-3xl">Update Customer</h1>

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
              value={form.nama}
            />
            <Input
              type={"text"}
              label="Nomor Telepon"
              id="noHP"
              name="noHP"
              placeholder="6289647755123"
              onChange={handleChange}
              required
              value={form.noHP}
            />
            <Input
              type={"text"}
              label="Alamat Pemasangan"
              id="alamat"
              name="alamat"
              placeholder="Alamat Lengkap"
              onChange={handleChange}
              required
              value={form.alamat}
            />
            <SelectInput
              id="paket"
              name={"paket"}
              label="Jenis Paket"
              options={products}
              onChange={handleChange}
              defaultValue={form.paket}
            />
            <FileInput
              id="ktp"
              name="ktp"
              label="Foto KTP (Kartu Tanda Penduduk)"
              accept=".png, .jpg, .jpeg"
              helpText="PNG, JPG or JPEG"
              onChange={handleChangeFile}
              required={false}
            />
            <FileInput
              id="fotoBangunan"
              name="fotoBangunan"
              label="Foto Bangunan Pemasangan"
              accept=".png, .jpg, .jpeg"
              helpText="PNG, JPG or JPEG"
              onChange={handleChangeFile}
              required={false}
            />
            <h1 className="text-sm font-bold">Old KTP</h1>
            <h1 className="text-sm font-bold">Old Foto Bangunan</h1>
            <img
              src={`http://127.0.0.1:8000/images/${img.ktp}`}
              width={"100%"}
            />
            <img
              src={`http://127.0.0.1:8000/images/${img.fotoBangunan}`}
              width={"100%"}
            />
            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  );
}
