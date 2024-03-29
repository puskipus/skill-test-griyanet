import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import AddButton from "../../components/Button/AddButton";
import { deleteData, getData } from "../../utils/fetch";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Customer() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await getData("/customer");
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (data) => {
    const result = await Swal.fire({
      title: "Anda yakin menghapus customer ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    // Check the result of the confirmation dialog
    if (result.isConfirmed) {
      try {
        const res = await deleteData(`/customer/${data}`);

        if (res?.data) {
          toast.success("Berhasil Hapus penugasan", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          fetchCustomers();
        } else {
          toast.error(
            res?.response?.data?.message || "Terjadi kesalahan pada server",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <Navbar />

      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl">Customer</h1>
            <AddButton to="/customer/add" />
          </div>

          {/* table */}
          <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-3">
                    No HP
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Alamat
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Paket
                  </th>
                  <th scope="col" className="px-6 py-3">
                    KTP
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Foto Bangunan
                  </th>
                  <th scope="col" className="px-6 py-3 col-span-2 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{row.nama}</td>
                    <td className="px-6 py-4">{row.noHP}</td>
                    <td className="px-6 py-4">{row.alamat}</td>
                    <td className="px-6 py-4">{row.paket}</td>
                    <td className="px-6 py-4 hover:underline cursor-pointer">
                      <img
                        src={`http://127.0.0.1:8000/images/${row.ktp}`}
                        width={"100rem"}
                      />
                    </td>
                    <td className="px-6 py-4 hover:underline cursor-pointer">
                      <img
                        src={`http://127.0.0.1:8000/images/${row.fotoBangunan}`}
                        width={"100rem"}
                      />
                    </td>
                    <td
                      onClick={() => handleDelete(row.id)}
                      className="px-6 py-4 text-red-600 font-bold cursor-pointer hover:underline"
                    >
                      Delete
                    </td>
                    <td className="px-6 py-4 text-green-600 font-bold cursor-pointer hover:underline">
                      <Link to={`/customer/${row.id}`}>Update</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
