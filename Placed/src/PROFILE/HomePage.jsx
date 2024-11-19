import React from 'react';
import AppDrawer from './AppDrawer';

const HomePage = () => {
    const style = {
    marginTop: 100,
    marginLeft: 30,
    color: 'white',
    fontSize: '20px',
    textAlign: 'left'
};
    
  return (
    
    <div>
      <h1 style={style}>Welcome to the Home Page</h1>

      {/* Add AppDrawer with custom menu items */}
      <AppDrawer>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </AppDrawer>

      <p style={style}>Content of the page goes here.</p>
    </div>
  );
};

export default HomePage;
