import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import "./tailwind.css";

import Home from "./pages/Home";
import Contact from "./pages/Contact";

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
    <BrowserRouter>
        <Nav></Nav>
        <Routes>
        <Route exact path="" element={<Home></Home>} />
        <Route exact path="/contact-us" element={<Contact></Contact>} />
        </Routes>
    </BrowserRouter>
  );