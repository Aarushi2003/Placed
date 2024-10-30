import React, {useState} from 'react';
import NavBar from "../NAVBAR/NavBar.jsx";
import Carousel from '../CAROUSEL/Carousel.jsx';
import Others from '../OTHERS/Others.jsx';

function Home()
{
    return(
        <>
        <NavBar/>
        <div className="home-container">
            <div class="tagline">
                <h1>Experience-Powered</h1>
                <h1>Placement Insights.</h1>                
                <h3
                 className="subtext">Your placement story starts from here.</h3>
            </div>
            <div className="Search">
                <input type="text" className="search-box" placeholder="   Search or Jump To.."></input>
                <button className="search-button"> Search </button>
            </div > 
            <div className="question-container">
                <div class="question">
                    <span>What are you looking for?</span> 
                </div>  
            </div>           
        </div>
        <Carousel></Carousel>
        <Others></Others>
        </>
    );
}
export default Home;