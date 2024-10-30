import React from "react";
import logo from "./placed.png";
import profile from "./profile.png"
import "./navbarstyles.css";

function NavBar()
{
    return(
        <div className="nav-containerf">
        <nav>
            <div className="nav-left-and-right">
                <div className="logo-imagef">
                    <a href="/"><img src={logo} alt="logo"></img></a>
                </div>
                <div className="nav-linkf">
                    <ul>
                        <li><a href="/comps">Companies</a></li>
                        <li><a href="/#">Discussion Forums</a></li>
                        <li><a href="/#">Rounds</a></li>
                        <button className="profile-buttonf" onClick={""}><img src={profile}></img></button>
                    </ul>
                </div>
            </div>
        </nav>
        </div>
    );
}
export default NavBar;