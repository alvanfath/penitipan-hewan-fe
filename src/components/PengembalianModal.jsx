import { useState } from "react";
import axios from "axios";

function PengembalianModal({ transaksi, onClose, onSuccess }) {
  const [tunai, setTunai] = useState("");
  const [waktu, setWaktu] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/pengambilan-hewan", {
        id: transaksi.id,
        tunai: Number(tunai),
        waktu_pengambilan: waktu, // format d-m-Y H:i
      });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengembalikan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-[320px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Pengembalian – {transaksi.nama_hewan}
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Tunai (Rp)"
            value={tunai}
            onChange={(e) => setTunai(e.target.value)}
            className="border rounded p-2 w-full"
          />
          <input
            type="text"
            placeholder="13-09-2025 14:30"
            value={waktu}
            onChange={(e) => setWaktu(e.target.value)}
            className="border rounded p-2 w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? "Memproses..." : "Kembalikan"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalPengembalian;
