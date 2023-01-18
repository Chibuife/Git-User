import { useState } from "react"
import App from "../App";
import search from "./search.svg"

export const Search = ({inputRef, setUserName, usersName, setUserNameRef})=>{
    // if (usersName){
    //     console.log(inputRef.current.value)
    // }
    
    return(
        <div className="search">
            <img src={search} alt="" />
            <input type="text" 
             onChange={(e)=> { setUserName(e.target.value)}} 
              ref={inputRef}  placeholder="Enter Github User" />
            <div className="searchBtn" 
            onClick={()=>{
                if (usersName){
                    console.log(inputRef.current.value)
                    setUserNameRef(inputRef.current.value)
                }
            }
            }
            >
                Search
            </div>
        </div>
    )
    
}


