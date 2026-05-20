import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts y Protección
import { PublicLayout } from './components/layouts/PublicLayout';
import { AdminLayout } from './components/layouts/AdminLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Páginas Públicas
import TurnosPublicos from './pages/public/TurnosPublicos';
import Login from './pages/public/Login';

// Páginas de Administración
import CrudTurnos from './pages/admin/CrudTurnos';
import ListadoReservas from './pages/admin/ListadoReservas';

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* RUTAS PÚBLICAS (Envueltas en PublicLayout) */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<TurnosPublicos />} />
                    <Route path="/login" element={<Login />} />
                </Route>

                {/* RUTAS PROTEGIDAS (Envueltas en ProtectedRoute y AdminLayout) */}
                <Route path="/admin" element={<ProtectedRoute />}>
                    <Route element={<AdminLayout />}>
                        {/* Redirección por defecto al entrar a /admin */}
                        <Route index element={<Navigate to="turnos" replace />} />

                        {/* Rutas Anidadas de Admin */}
                        <Route path="turnos" element={<CrudTurnos />} />
                        <Route path="reservas" element={<ListadoReservas />} />
                    </Route>
                </Route>

                {/* Ruta comodín (404) para manejar URLs inexistentes */}
                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;