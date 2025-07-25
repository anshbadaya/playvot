import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Match from "@/pages/Matches";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Match />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
