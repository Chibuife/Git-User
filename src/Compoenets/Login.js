import { AuthErrorCodes, signInWithEmailAndPassword,  GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import React, { useCallback, useContext, useEffect, useState } from "react"
 import { Link, Navigate } from "react-router-dom";
import { auth } from "../auth";

import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
import GoogleButton from "react-google-button";

const Login = ()=>{

    const navigate = useNavigate()
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[user, setUser] = useState();
   const inputemail = (e)=>{
    setEmail(e.target.value)    
   }


   const inputpassword= (e=>{
    setPassword( e.target.value)
   })


   //login auth function
    const loginEmailPassword = async (e)=> {
        console.log("hi")
        e.preventDefault()
    const loginEmail = email;
    const loginPassword = password;
    console.log(loginEmail)
    console.log(loginPassword)
        try{
            const userCredential = await signInWithEmailAndPassword (auth, loginEmail, loginPassword);
            setUser(userCredential.user)
            console.log(userCredential.user)
            navigate("/home")
        }
        catch(error){
            console.log(error)
            alert(error)
            const showLoginError = (error)=>{
                //using use state hook to arrange it 
                if (error.code === AuthErrorCodes.INVALID_PASSWORD){
                    return(
                        
                        alert('Invalid Password')
                    )
                }
                if (error.code === AuthErrorCodes.INVALID_EMAIL){
                    alert('Invalid Email')
                }
            }
        }
  } 
 
    // adding email
    const signinWithEmail = ()=>{
        const provider = new GoogleAuthProvider();
       
        signInWithPopup(auth, provider)
      .then((result) => {
       
        const credential = GoogleAuthProvider.credentialFromResult(result);
        
        console.log(credential)
    
        navigate("/home")
        // ...
      }).catch((error) => {
       
        const errorCode = error.code;
        const errorMessage = error.message;
      
        const email = error.customData.email;
       
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }
 
    return(
        <>
        <h1>Github Users</h1>
        <div><Link to={"/a/login"}>Log In</Link> <Link to={"/a/signup"}>Sign Up</Link></div>
        <form onSubmit={loginEmailPassword}>
        <GoogleButton onClick={signinWithEmail}/>
        <div>or</div>
        <input type="email" value={""||email} onChange={inputemail}/><br />
       
        <input type="password" value={""||password} onChange={inputpassword}/><br />
       <br/>
        <div><Link to={"/a/passwordreset"}>Don't remember you password?</Link></div>
        <button >Log </button><br />
    
        </form>
        </>
    )
}

export default Login;