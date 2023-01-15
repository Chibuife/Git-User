import { async } from "@firebase/util"
import { sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { resolvePath, useNavigate, useOutletContext } from "react-router-dom"
import { auth } from "../auth"
import back from "./back.svg"
export const PasswordReset = ()=>{
    const navigate = useNavigate()
    const [input] = useOutletContext();
    const email = input.props.value;
    const [active, setActive] = useState(false)
    const navgating= ()=>{
        setActive(current=> !current)
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
            
            <div className="gray">
            <div className="back" onClick={ ()=>{
                setTimeout(()=>{
                    navgating()
                },500)
                setTimeout(()=>{
                    navigate(-1)
                },1500 )
            } }> <img  className="backimg" src={back} alt="" /></div>
             <img className="authImg" src="https://dev-pu8wyk-g.us.auth0.com/img/badge.png" alt="" />
             <h1>Reset Your Password</h1>
            </div>
            <div className={active ? "forgottenPasswordBox": ''}>
            <p className="passwordResettext">please enter your email address. We will send you an email to reset your password</p>
            <form onSubmit={sendpasswordreset}>
            <div>{input}</div>
            </form>
            </div>
            <button className= "sendEmailBtn" type="submit">Send Email</button>
            
        </div>
    )
}