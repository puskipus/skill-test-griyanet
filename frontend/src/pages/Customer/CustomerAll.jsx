import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import { getData } from "../../utils/fetch";
import DownloadButton from "../../components/Button/DownloadButton";
import { saveAs } from "file-saver";

export default function CustomerAll() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await getData("/customer/all");
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPDF = async () => {
    try {
      const res = await getData("/customer/all/convert", null, "blob");

      const blobData = new Blob([res.data], { type: "application/pdf" });
      saveAs(blobData, "customers.pdf");
    } catch (error) {
      console.error("Error fetching PDF:", error);
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
          <div className="flex justify-between">
            <h1 className="text-3xl">All Customer</h1>
            <DownloadButton onCLick={() => fetchPDF()} />
          </div>

          {/* table */}
          <div class="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Nama
                  </th>
                  <th scope="col" class="px-6 py-3">
                    No HP
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Alamat
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Paket
                  </th>
                  <th scope="col" class="px-6 py-3">
                    KTP
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Foto Bangunan
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
                    <td
                      className="px-6 py-4 hover:underline cursor-pointer"
                      // onClick={() => handleDownloadImage(row.ktp)}
                    >
                      {/* {row.ktp} */}
                      <img
                        src={`http://127.0.0.1:8000/images/${row.ktp}`}
                        width={"100rem"}
                      />
                    </td>
                    <td className="px-6 py-4 hover:underline cursor-pointer">
                      {/* {row.fotoBangunan} */}
                      <img
                        src={`http://127.0.0.1:8000/images/${row.fotoBangunan}`}
                        width={"100rem"}
                      />
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
