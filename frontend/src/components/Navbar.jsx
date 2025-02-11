import { CircleUserRound, FileCheck2, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./DarkMode";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="py-4 dark:bg-slate-900 bg-white text-foreground shadow-md">
      <div className="px-4 md:container md:mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <span className="flex items-center gap-2 text-yellow-500 text-xl font-bold">
            <FileCheck2 />
            todo
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 font-bold">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todo">Todo</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </li>
          <li>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </li>
          <li>
            <Button>Log Out</Button>
          </li>
          <li>
            <CircleUserRound />
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden fixed top-0 left-0 w-1/2 h-full bg-white dark:bg-slate-900 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <span className="flex items-center gap-2 text-yellow-500 text-xl font-bold">
              <FileCheck2 />
              todo
            </span>
          </Link>
          <button onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col items-center gap-6 py-6 text-lg">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/todo" onClick={() => setMenuOpen(false)}>
              Todo
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About Us
            </Link>
          </li>
          <li>
            <Button
              onClick={() => {
                navigate("/signup");
                setMenuOpen(false);
              }}
            >
              Sign Up
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
            >
              Login
            </Button>
          </li>
          <li>
            <Button>Log Out</Button>
          </li>
          <li>
            <CircleUserRound />
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
