import React, { useCallback, useState, useEffect} from "react"
import { Link, Navigate, Outlet } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, sendSignInLinkToEmail,isSignInWithEmailLink, signInWithEmailLink, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from "firebase/auth";
import { auth } from "../auth";

import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
import GoogleButton from "react-google-button";
const Signup = ({ history })=>{
    const[name, setname] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    let navigate = useNavigate();
    const inputname = (e)=>{
        setname(e.target.value)    
       }

   const inputemail = (e)=>{
    setEmail(e.target.value)    
   }


   const inputpassword= (e=>{
    setPassword( e.target.value)
   })
const createAccount = async (e)=>{
    console.log("hi")
    e.preventDefault()
const loginEmail = email;
const loginPassword = password;
const loginName = name;

console.log(loginEmail)
console.log(loginPassword)
    try{
       
    
        const userCredential = await createUserWithEmailAndPassword (auth, loginEmail, loginPassword, loginName);
        const username = await  updateProfile(auth.currentUser,  {displayName: loginName});
        console.log(userCredential.user.emailVerified)
        if(userCredential.user.emailVerified === true){
            navigate("/home")
        }else{
            navigate("/verification")
        }
        sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log(auth.currentUser)
        });
        // userCredential.currentUser.sendEmailVerification();
        // navigate("/home")
       
    }
    catch(error){
        console.log(error)
        alert(error)
        const showLoginError = (error)=>{
            // using use state hook to arrange it 
            // if (error.code === AuthErrorCodes.INVALID_PASSWORD){
            //     return(
            //         <>
            //         <h4>wrong password try again</h4>
            //         </>
            //     )
            // }
        }
    }
   }
   const googleSignIn= ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
}
const handleGoogleSignIn = async () =>{
        try{
             googleSignIn();
             navigate("/home")
        }catch(error){
            console.log(error)
        }
    }
    return(
        <div>
        <h1>Signup</h1>
        <div><Link to={"/a/login"}>Log In</Link> <Link to={"/a/signup"}>Sign Up</Link></div>
        <form onSubmit={createAccount}>
        <GoogleButton onClick={handleGoogleSignIn}/>
        <div>or</div>
        
        <input type="email" value={email || ""} onChange={inputemail}/><br />
        
        <input type="password"  value={password || ""}  onChange={inputpassword}/><br />
       
        <p>
            By signing up, you agree to our terms of service and privacy policy.
        </p>
        <button type="submit">Sign Up {">"}</button><br />
      
        </form>
        </div>
    )
}

export default Signup
