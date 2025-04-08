import React from 'react'
import { Link } from 'react-router'


function NavBar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-info-subtle">
  <div className="container-fluid">
    <a className="navbar-brand mx-5 px-5" href="#">
      Navbar
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      <form className="d-flex me-auto  mb-lg-0" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>

      <ul className="navbar-nav  px-5">
        <li className="nav-item">
        <Link style={{textDecoration:"none" , color:"black"}} className='p-2' to={"/admin-Dashboard"}>Admin-Dashboard</Link>
        </li>
        <li className="nav-item">
        
        <Link style={{textDecoration:"none", color:"black"}} className='p-2' to={"/Dashboard"}>User-Dashboard</Link>
        </li>
        
        
        
      </ul>
    </div>
  </div>
</nav>

    
    </>
  )
}

export default NavBar