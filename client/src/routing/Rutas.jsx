import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Header } from '../components/layout/Header';
import { BarNav } from '../components/layout/BarNav';
import { MisAnuncios } from '../components/pages/MisAnuncios';
import { FormularioAnuncio } from '../components/pages/FormularioAnuncio';
export const Rutas = () => {
  return (
    <BrowserRouter>
      <BarNav />
      <Header />
      <Routes>
        <Route path="/MisAnuncios" element={<MisAnuncios />} />
        <Route path="/FormularioAnuncio" element={<FormularioAnuncio/>} />
      </Routes>

    </BrowserRouter>
  )
}
