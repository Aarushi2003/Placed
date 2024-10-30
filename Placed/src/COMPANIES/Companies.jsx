import NavBar from "../NAVBAR/NavBar.jsx";
import SearchBar from "../SEARCHBAR/SearchBar.jsx";
import "./companyStyles.css";
import ScrollContainer from "../SCROLLCONTAINER/ScrollContainer.jsx";
import CompanyCard from "../SCROLLCONTAINER/CompanyCard.jsx";
import QuestionCard from "../QUESTIONCARD/QuestionCard.jsx";
import { useState } from "react";

const tempQuestion = "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.";
const tempQuestion2 = `The minimum absolute difference of an array a is defined as the minimum value of |a[i] - a[j]|, where 0 <= i < j < a.length and a[i] != a[j]. If all elements of a are the same, the minimum absolute difference is -1.

For example, the minimum absolute difference of the array [5,2,3,7,2] is |2 - 3| = 1. Note that it is not 0 because a[i] and a[j] must be different.
You are given an integer array nums and the array queries where queries[i] = [li, ri]. For each query i, compute the minimum absolute difference of the subarray nums[li...ri] containing the elements of nums between the 0-based indices li and ri (inclusive).`


const info = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const alltabs = ["Tab A", "Tab X"];
const tabs = [[{"label": "Tab A", "content": tempQuestion}, {"label": "Tab A", "content": tempQuestion2}], [{"label": "Tab X", "content": "222dfasdfas"}]]
const tabInfo = {"Tab A": tabs[0], "Tab X": tabs[1]};

function Companies(){
    const [currSearchText, setSearchText] = useState("");
    const [currCompany, setCurrCompany] = useState();
    const [currTab, setTab] = useState("Tab A");

    const handleChange = (e) => {
        setSearchText(e);
    };
    const changeTab = (e) => {
        // console.log(e.target.innerText);
        setTab(e.target.innerText);
    };
    return (
        <>
            <NavBar/>
            <div className="searchbar">
                <SearchBar onSearchChange = {handleChange} />
            </div>
            {/* <button onClick={() => console.log(currSearchText)}>aa</button> */}
            <div className="overall">
                <div className="scroll-container-left">
                    <ScrollContainer value = {currSearchText}/>
                </div>
                <div className="company-details-right">
                    <div className="company-top">
                        <CompanyCard company = {{ name: "TLSE", type: "abcd", img: "123.png", id: 1 }}/>
                    </div>
                    <div className="info-text">
                        <div class="tabs">
                                <div class="tab-list">
                                    {alltabs.map((curr) =>(
                                        <div>
                                            <button className="tab-tab" id={curr} onClick={changeTab}>{curr}</button>
                                        </div>
                                    ))}
                                </div>
                        </div>
                        <div className="tab-items">

                            {tabInfo[currTab].map((item) =>(
                                <div className="tab-item">
                                    <QuestionCard content={item["content"]}/>
                                </div>
                                )                            
                            )}
                            
                        </div>
                        {/* hello */}
                    </div>
                </div>
            </div>
        </>

    );
}

export default Companies;