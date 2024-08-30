import React from 'react'
import logo from '../assets/logo.svg';

const Navbar = () => {
  return <nav className="mb-20 flex item-center justify-between py-6">
    <div className="flex flex-shrink-0 items-">
        <img className='mx-2 w-10' src={logo} alt="" />
    </div>
    <div className="m-8 flex items-center justify-center gap-8 text-2xl">
      <p>Home</p>
      <p>Experience</p>
      <p>Projects</p>
      <p>Contact</p>
    </div>
  </nav>
}

export default Navbar