import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListTransaksiPage from './pages/ListTransaksiPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListTransaksiPage />} />
      </Routes>
    </BrowserRouter>
  );
}