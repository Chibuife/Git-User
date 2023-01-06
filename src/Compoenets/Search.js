import { useState } from "react"
import search from "./search.svg"
export const Search = ({usersName, input})=>{
    
    return(
        <div className="search">
            <img src={search} alt="" />
            <input type="text"  value={usersName} onChange={input}/>
            <div className="searchBtn">
                Search
            </div>
        </div>
    )
}