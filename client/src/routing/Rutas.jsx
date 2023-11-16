import React from 'react'
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import { Header } from '../components/layout/Header';
import { BarNav } from '../components/layout/BarNav';
export const Rutas = () => {
  return (
    <BrowserRouter>
        <Header/>
        <BarNav/>
    </BrowserRouter>
  )
}
