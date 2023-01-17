import { AuthErrorCodes, signInWithEmailAndPassword,  GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import React, { useCallback, useContext, useEffect, useState } from "react"
 import { Link, Navigate, useOutletContext } from "react-router-dom";
import { auth } from "../auth";
import passwordicon from "./password.svg"
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
import GoogleButton from "react-google-button";
import submit from "./submit.svg"

const Login = ()=>{
    const [activeLogin, setActiveLogin] = useState(false)
    const navgateLink = ()=>{
        setActiveLogin(current=> !current)
    }
    const navigate = useNavigate()
    const [input] = useOutletContext();
    const email = input.props.children[2].props.value;
    const[password, setPassword] = useState("")
    const[user, setUser] = useState();
 
    
    const [active, setActive] = useState(false)
    const navgating= ()=>{
        setActive(current=> !current)
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


   // function for the navitating to password
   const forgottenpassword = (e, path)=> {
    e.preventDefault();
    setTimeout(()=>{
        navgating()
    },500)
    setTimeout(()=> navigate(path), 1500);
  }
    return(
        <div className="login">
        <div className="gray">
        <img className="authImg" src="https://dev-pu8wyk-g.us.auth0.com/img/badge.png" alt="" />
        <h1>Github Users</h1>
        </div>
        
        {/* my login block  */}
        <div className={active? "navigate-to": ""}>
        <div className="link-signUp-login"><Link className={activeLogin ? "link-login not-active " : "link-login  active"} to={"/a/login"}>Log In</Link> <Link className= "link-signup not-active"  to={"/a/signup"}>Sign Up</Link></div>
        <form onSubmit={loginEmailPassword}>
        <GoogleButton className="googleButton" onClick={signinWithEmail}/>
        
        <div className="or">or</div>
     
        <div>{input}</div>
        <div className="inputbox"><div className="gray input-icon"><img src={passwordicon} alt="" /></div> <input type="password" value={""||password} onChange={inputpassword}/></div><br />
        <br/>
        <div className="passwordReset"><Link  onClick={(e)=>forgottenpassword(e,"/a/passwordreset" )}>Don't remember you password?</Link></div>
        </form>
        </div>
       
       {/* my button */}
        <button >Log <img src={submit} alt="" /></button><br />
    
        
        </div>
    )
}

export default Login;