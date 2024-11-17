import { useState } from 'react';
import ReactDOM from "react-dom/client";
import Companies from "./COMPANIES/Companies.jsx";
import Home from "./HOME/Home.jsx";
import NavBar from './NAVBAR/NavBar.jsx';
import Questions from './QUESTIONS/questions.jsx';

import { BrowserRouter, Routes, Route} from "react-router-dom";

 
function App() {
  return (

    <BrowserRouter>
      {/* <NavBar></NavBar> */}
      <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/comps" element={<Companies />} />
            <Route path="/ques" element={<Questions/>} />
          </Routes>
      </div>
  </BrowserRouter>

);
}
export default App;
