import { CircleUserRound, FileCheck, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./DarkMode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "@/store";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const username = sessionStorage.getItem("username");

  const logoutHandler = () => {
    sessionStorage.clear("userId");
    sessionStorage.clear("username");
    dispatch(authActions.logout());
  };

  return (
    <nav className="py-4 dark:bg-slate-900 bg-white text-foreground shadow-md">
      <div className="px-4 md:container md:mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <span className="flex items-center gap-2 text-yellow-500 dark:text-primary text-2xl font-bold">
            <FileCheck />
            todo
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-4 font-bold">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todo">Todo</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className="flex gap-1 items-center justify-center font-normal">
                <CircleUserRound />
                <span>{username}</span>
              </li>
              <li>
                <Button onClick={logoutHandler} size="sm">
                  Log Out
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Button size="sm" onClick={() => navigate("/login")}>
                  Login
                </Button>
              </li>
              <li>
                <Button size="sm" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
              </li>
            </>
          )}
          <li>
            <ModeToggle />
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-foreground">
          <ModeToggle />
        </div>
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 w-1/2 h-full bg-white dark:bg-slate-900 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <span className="flex items-center gap-2 text-yellow-500 text-2xl font-bold">
              <FileCheck />
              todo
            </span>
          </Link>
          <button onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col ps-5 gap-3 py-4 text-l font-bold">
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

          {isLoggedIn ? (
            <>
              <li onClick={logoutHandler}>LogOut</li>
              <li className="flex gap-1 items-center font-normal">
                <CircleUserRound />
                <span>{username}</span>
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
              >
                Login
              </li>

              <li
                onClick={() => {
                  navigate("/signup");
                  setMenuOpen(false);
                }}
              >
                Sign Up
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
