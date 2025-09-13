import { useEffect, useState } from "react";
import { getHewanList, getTransaksiList } from "../api";
import { useNavigate } from "react-router-dom";
import CreateTransaksiModal from "../components/CreateTransaksiModal";

export default function ListTransaksiPage() {
  const navigate = useNavigate();
  const [hewanList, setHewanList] = useState([]);
  const [selectedHewan, setSelectedHewan] = useState("");
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchTransaksi = () => {
    setLoading(true);
    getTransaksiList(selectedHewan ? { jenisHewan: selectedHewan } : {})
      .then((res) => setTransaksi(res.data.data.responseData))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getHewanList().then((res) => setHewanList(res.data.data));
  }, []);

  useEffect(() => {
    fetchTransaksi();
  }, [selectedHewan]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daftar Transaksi</h1>

      {/* Tombol Create */}
      <div className="mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Buat Transaksi
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-4">
        <label className="font-medium">
          Filter Hewan:
          <select
            className="ml-2 border rounded px-3 py-1"
            value={selectedHewan}
            onChange={(e) => setSelectedHewan(e.target.value)}
          >
            <option value="">Semua</option>
            {hewanList.map((h) => (
              <option key={h.id} value={h.id}>
                {h.jenis_hewan}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Tabel Transaksi */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Kode</th>
              <th className="p-2 border">Pemilik</th>
              <th className="p-2 border">Hewan</th>
              <th className="p-2 border">Biaya Sementara</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  Tidak ada data
                </td>
              </tr>
            )}
            {transaksi.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2 border">{item.kode_penitipan}</td>
                <td className="p-2 border">{item.nama_pemilik}</td>
                <td className="p-2 border">{item.nama_hewan}</td>
                <td className="p-2 border">
                  Rp{" "}
                  {new Intl.NumberFormat("id-ID").format(
                    item.biaya_sementara ?? 0
                  )}
                </td>
                <td className="p-2 border">
                  {item.status === "Ongoing" ? (
                    <button
                      onClick={() => navigate(`/pengembalian/${item.id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Pengembalian
                    </button>
                  ) : (
                    <span className="text-gray-500">{item.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal Create */}
      <CreateTransaksiModal
        open={showModal}
        onClose={() => setShowModal(false)}
        hewanList={hewanList}
        onSuccess={fetchTransaksi}
      />
    </div>
  );
}
