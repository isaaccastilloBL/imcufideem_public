import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import ConsultaReferencia from './pages/ConsultaReferencia';
import Sucursales from './pages/Sucursales';
import AcercaDe from './pages/AcercaDe';
import Contacto from './pages/Contacto';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="consulta" element={<ConsultaReferencia />} />
        <Route path="sucursales" element={<Sucursales />} />
        <Route path="acerca" element={<AcercaDe />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
