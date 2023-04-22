import { useState } from "react"
import App from "../App";
import search from "./search.svg"

export const Search = ({ inputRef, fetchData})=>{
    // if (usersName){
    //     console.log(inputRef.current.value)
    // }
    
    return(
        <div className="search">
            <img src={search} alt="" />
            <input type="text" 
              ref={inputRef}  placeholder="Enter Github User" />
            <div className="searchBtn" 
            onClick={()=>{
                fetchData(inputRef.current.value)
            }
            }
            >
                Search
            </div>
        </div>
    )
    
}


