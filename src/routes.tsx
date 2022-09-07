import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import DetailProduct from "./pages/detail-product";

export default function RoutesComponents() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
