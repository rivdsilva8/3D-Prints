import React from "react";
import "./Admin.css";
import SideBar from "../../components/SideBar/SideBar.jsx";
import { Routes, Route } from "react-router-dom";
import { AddProduct } from "../../components/AddProduct/AddProduct.jsx";
import { ListProduct } from "../../components/ListProduct/ListProduct.jsx";
export default function Admin() {
  return (
    <div className="admin">
      <SideBar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
      </Routes>
    </div>
  );
}
