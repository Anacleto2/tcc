
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import LandingPage from "../pages/landignPage";
import CriacaoDeConta from "../pages/cracaoDeConta";
import Reservas from "../pages/reservas";
import PageNotFound from "../pages/pageNotFound";


export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/criacao-de-conta" element={<CriacaoDeConta />} />
        <Route path="/reserva" element={<Reservas />} />
        <Route path="/*" element={<PageNotFound />} />
        

      </Routes>
    </BrowserRouter>
  );
};
