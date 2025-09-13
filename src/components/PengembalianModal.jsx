import { useState } from "react";
import axios from "axios";

function PengembalianModal({ open, transaksi, onClose, onSuccess }) {
  const [tunai, setTunai] = useState("");
  const [waktu, setWaktu] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open || !transaksi) return null; // hanya render jika modal open dan ada data

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.put("http://localhost:8000/api/transaksi/pengambilan-hewan", {
        id: transaksi.id,
        tunai: Number(tunai),
        waktu_pengambilan: waktu, // format d-m-Y H:i
      });
      onSuccess(); // refresh list di parent
      onClose();   // otomatis tutup modal
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengembalikan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-6 w-[320px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Pengembalian – {transaksi.nama_hewan ?? ""}
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="number"
            placeholder="Tunai (Rp)"
            value={tunai}
            onChange={(e) => setTunai(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="13-09-2025 14:30"
            value={waktu}
            onChange={(e) => setWaktu(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />

          <div className="flex justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded"
            >
              Tutup
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Kembalikan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PengembalianModal;
