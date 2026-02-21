import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import Nav from "./components/Nav";
import "./tailwind.css";

import Home from "./pages/Home";
import Contact from "./pages/Contact";

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
    <BrowserRouter>
      <LanguageProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/en" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/en/contact" element={<Contact />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
);