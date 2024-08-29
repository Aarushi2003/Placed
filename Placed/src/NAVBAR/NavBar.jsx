import React from "react";
import logo from "./placed.png";
import profile from "./profile.png"
function NavBar()
{
    return(
        <div className="nav-container">
        <nav>
            <div>
                <div className="logo-image">
                    <img src={logo} alt="logo"></img>
                </div>
                <div className="nav-link">
                    <ul>
                        <li><a href="/#">Companies</a></li>
                        <li><a href="/#">Discussion Forums</a></li>
                        <li><a href="/#">Rounds</a></li>
                        <button className="profile-button" onClick={""}><img src={profile}></img></button>
                    </ul>
                </div>
            </div>
        </nav>
        </div>
    );
}
export default NavBar;