import { useState } from "react";
import { createTransaksi } from "../api";

export default function CreateTransaksiModal({ open, onClose, hewanList, onSuccess }) {
  const [form, setForm] = useState({
    id_hewan: "",
    nama_hewan: "",
    nama_pemilik: "",
    no_telp: "",
    email: "",
    waktu_penitipan: "",
    foto: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      await createTransaksi(formData);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal membuat transaksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center
          transition-all duration-300 ease-out
          ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Buat Transaksi</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Hewan</label>
              <select
                name="id_hewan"
                required
                value={form.id_hewan}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
              >
                <option value="">Pilih Hewan</option>
                {hewanList.map((h) => (
                  <option key={h.id} value={h.id}>{h.jenis_hewan}</option>
                ))}
              </select>
            </div>

            <input
              type="text"
              name="nama_hewan"
              required
              placeholder="Nama Hewan"
              className="border rounded w-full px-3 py-2"
              value={form.nama_hewan}
              onChange={handleChange}
            />
            <input
              type="text"
              name="nama_pemilik"
              required
              placeholder="Nama Pemilik"
              className="border rounded w-full px-3 py-2"
              value={form.nama_pemilik}
              onChange={handleChange}
            />
            <input
              type="text"
              name="no_telp"
              required
              placeholder="No Telp"
              className="border rounded w-full px-3 py-2"
              value={form.no_telp}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="border rounded w-full px-3 py-2"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="datetime-local"
              name="waktu_penitipan"
              required
              className="border rounded w-full px-3 py-2"
              value={form.waktu_penitipan}
              onChange={handleChange}
            />
            <input
              type="file"
              name="foto"
              accept="image/*"
              required
              onChange={handleChange}
              className="border rounded w-full px-3 py-2"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-400 hover:bg-gray-500 text-white"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
