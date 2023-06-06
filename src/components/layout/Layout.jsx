import React from 'react'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  return (
    <div>

    <ToastContainer theme="colored" position="top-center" closeOnClick/>

        <Header/>
        <div>
        <Outlet/>
        </div>
        
        <Footer/>
    </div>
  )
}

export default Layout