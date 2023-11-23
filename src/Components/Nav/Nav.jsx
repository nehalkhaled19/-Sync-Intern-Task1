import React from 'react'
import logo from '../../imgs/logo.w-removebg-preview.png'
export default function Nav() {
  return   <nav className="navbar navbar-expand-lg ">
  <section className="container">
    <a className="navbar-brand d-flex align-items-center" href="#">
        <img src={logo} className='logo' alt="logo" />
        <span className='nav-text'>Skiy</span>
    </a>
 
   
  </section>
</nav>
}
