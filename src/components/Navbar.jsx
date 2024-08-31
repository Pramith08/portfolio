import React from 'react'
import logo from '../assets/logo.svg';

const Navbar = () => {
  return <nav className="mb-20 flex item-center justify-between py-6">
    <div className="flex flex-shrink-0 items-">
        <img className='mx-2 w-10' src={logo} alt="" />
    </div>
    <div className="m-8 flex items-center justify-center gap-8 text-2xl">
      <a className='hover:text-cyan-300' href="#home" >Home</a>
      <a className='hover:text-cyan-300' href="#experience" >Experience</a>
      <a className='hover:text-cyan-300' href="#project" >Projects</a>
      <a className='hover:text-cyan-300 ' href="#contact" >Contact</a>
    </div>
  </nav>
}

export default Navbar