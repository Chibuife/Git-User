import { sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../auth"

export const PasswordReset = ()=>{
    const navigate = useNavigate()
    const[email, setEmail] = useState("")
    const inputemail = (e)=>{
        setEmail(e.target.value)    
       }
    const sendpasswordreset = (e)=>{
        e.preventDefault()
        console.log(email)
        sendPasswordResetEmail(auth, email)
        .then(() => {
        console.log("Password reset email sent!")
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        });
    }
    return(
        <div>
            <div onClick={()=> navigate(-1)}>{"<-"}</div>
            <h4>Reset Your Password</h4>
            <p>please enter your email address. We will send you an email to reset your password</p>
            <form onSubmit={sendpasswordreset}>
            <input type="email" value={email || ""} onChange={inputemail}/><br />
            <button type="submit">Send Email</button>
            </form>
        </div>
    )
}