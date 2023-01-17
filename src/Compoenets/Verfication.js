import { sendEmailVerification } from "firebase/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../auth"

export const Verification = ()=>{
    console.log(auth)
    const navigate = useNavigate()
    // useEffect(() => {
        if(auth.currentUser.emailVerified === true){
        navigate("/home")
    }
    else{
       
    
     setTimeout(()=>{
        navigate(-1)
     }, 50000)
  

    const verfy = ()=>{  
        sendEmailVerification(auth.currentUser)
        .then(() => {
        alert('verification sent')
        setTimeout(()=>{
            navigate(-1)
         }, 1000)
        });
        }
            
    return(
        <div>
            
            <h1>Verfication</h1>
            <button onClick={verfy}>Send Verification</button>
            <button onClick={()=> navigate(-1)}>Back</button>
        </div>
    )
    }
    // }, [])


}