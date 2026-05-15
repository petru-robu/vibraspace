import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Mixer from "./pages/Mixer";
import Theory from "./pages/Theory";
import Workshop from "./pages/Workshop";
import WorkshopProject from "./pages/WorkshopProject";
import SessionForm from "./pages/SessionForm";
import CustomMixer from "./pages/CustomMixer";

import { Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mixer" element={<Mixer />} />
        <Route path="/theory" element={<Theory />} />
        <Route path="/workshop" element={<Workshop />} />
        <Route path="/workshop/:id" element={<WorkshopProject />} />
        <Route path="/session-form" element={<SessionForm />} />
        <Route path="/session-mixer" element={<CustomMixer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;