import { sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { auth } from "../auth"
import back from "./back.svg"
export const PasswordReset = ()=>{
    const navigate = useNavigate()
    const [input] = useOutletContext();
    const email = input.props.value;
  
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
            
            <div className="gray">
            <div className="back" onClick={()=> navigate(-1)}> <img src={back} alt="" /></div>
             <img src="https://dev-pu8wyk-g.us.auth0.com/img/badge.png" alt="" />
             <h1>Reset Your Password</h1>
            </div>
            <p className="passwordResettext">please enter your email address. We will send you an email to reset your password</p>
            <form onSubmit={sendpasswordreset}>
          
            <div>{input}</div>
            <button className= "sendEmailBtn" type="submit">Send Email</button>
            </form>
        </div>
    )
}