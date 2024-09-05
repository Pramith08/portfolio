import React, { useState } from 'react';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="mb-20 flex items-center justify-between py-6">
      <div className="flex items-center">
        <img className="mx-2 w-10" src={logo} alt="Logo" />
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-center gap-8 text-2xl">
        <a className="hover:text-cyan-300" href="#home">Home</a>
        <a className="hover:text-cyan-300" href="#experience">Experience</a>
        <a className="hover:text-cyan-300" href="#project">Projects</a>
        <a className="hover:text-cyan-300" href="#contact">Contact</a>
      </div>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-2xl focus:outline-none"
        >
          &#9776; {/* This is the hamburger menu icon */}
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        
        <div className="absolute top-16 right-8 w-auto bg-black rounded-md flex flex-col items-end gap-4 p-4 shadow-lg md:hidden text-2xl">
          <a onClick={toggleMenu} className="hover:text-cyan-300" href="#home">Home</a>
          <a onClick={toggleMenu} className="hover:text-cyan-300" href="#experience">Experience</a>
          <a onClick={toggleMenu} className="hover:text-cyan-300" href="#project">Projects</a>
          <a onClick={toggleMenu} className="hover:text-cyan-300" href="#contact">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
