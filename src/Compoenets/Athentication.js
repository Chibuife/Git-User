import { useState } from "react"
import { Outlet } from "react-router-dom"
import email from "./envelopIcon.svg"

export const Authentication = ()=>{
     
     const[mail, setEmail] = useState("")
     const inputemail = (e)=>{
          setEmail(e.target.value)
          
         }
        
   const input =  <div className="inputbox"><div className="gray input-icon"><img src={email} alt="" /></div> <input type="email" value={mail || ""} onChange={inputemail}/></div>
//    console.log(input.props.children[2].props.value)
return(    
    <div className="authBody">
     <div className="signin-login">
      <Outlet context={[input]}/>
     </div>  
    </div>
    )
  }