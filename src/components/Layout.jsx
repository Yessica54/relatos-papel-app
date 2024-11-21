import React from 'react';
import NavbarApp from './Navbar';
import Footer from './Footer';


const Layout = ({ children }) => {
  return (
    <>
      <NavbarApp />
        {children}
      <Footer />
    </>
  );
}

export default Layout;