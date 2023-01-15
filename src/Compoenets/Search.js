import { useState } from "react"
import App from "../App";
import search from "./search.svg"

export const Search = ({usersName, setUserName})=>{
    const intFetch = ()=>{
        setUserName({clicked:!usersName.clicked})
    }
    return(
        <div className="search">
            <img src={search} alt="" />
            <input type="text"  onChange={(e)=> { setUserName(e.target.value)}}  value={usersName}  placeholder="Enter Github User"/>
            <div className="searchBtn" 
            onClick={intFetch}
            >
                Search
            </div>
        </div>
    )
    
}


