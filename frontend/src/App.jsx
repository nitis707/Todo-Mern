import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Todo from "./pages/Todo";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
