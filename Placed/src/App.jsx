import { useState } from 'react';
import NavBar from "./NAVBAR/NavBar.jsx";
import Home from "./HOME/Home.jsx";
import Carousel from './CAROUSEL/Carousel.jsx';
import Others from './OTHERS/Others.jsx';
function App() {
  return (
    <>
      <NavBar></NavBar>
      <Home></Home>
      <Carousel></Carousel>
      <Others></Others>
    </>
  );
}
export default App;
