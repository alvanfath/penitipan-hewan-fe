import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getHewanList = () => axios.get(`${API_URL}/list-hewan`);

export const getTransaksiList = (params = {}) =>
  axios.get(`${API_URL}/transaksi/list-transaksi`, { params });

export function createTransaksi(formData) {
  // penting: multipart/form-data agar upload foto berhasil
  return axios.post(`${API_URL}/transaksi/create-transaksi`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
