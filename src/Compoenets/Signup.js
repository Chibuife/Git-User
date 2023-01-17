import React, { useCallback, useState, useEffect} from "react"
import { Link, Navigate, Outlet, useOutletContext } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, sendSignInLinkToEmail,isSignInWithEmailLink, signInWithEmailLink, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from "firebase/auth";
import { auth } from "../auth";
import passwordicon from "./password.svg"
import PasswordChecklist from "react-password-checklist"
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
import GoogleButton from "react-google-button";
import submit from "./submit.svg"
const Signup = ({ history })=>{
    const [activeLogin, setActiveLogin] = useState(false)
    const navgateLink = ()=>{
        setActiveLogin(current=> !current)
    }
    const [input] = useOutletContext();
    // console.log(input)
    const email = input.props.children[2].props.value;
    const[password, setPassword] = useState("")
    let navigate = useNavigate();

   const inputpassword= (e=>{
    setPassword( e.target.value)
   })
const createAccount = async (e)=>{
    console.log("hi")
    e.preventDefault()
const loginEmail = email;
const loginPassword = password;
// const loginName = name;

console.log(loginEmail)
console.log(loginPassword)
    try{
       
    
        const userCredential = await createUserWithEmailAndPassword (auth, loginEmail, loginPassword, );
        console.log(userCredential.user.emailVerified)
        if(userCredential.user.emailVerified === true){
            navigate("/home")
        }else{
            sendEmailVerification(auth.currentUser)
            .then(() => {
            alert('verification sent')
            navigate("/home")
            })
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
        }
    }
   }

const handleGoogleSignIn = async () =>{
        try{
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
            .then(()=>{ navigate("/home")})
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className="signin">
        <div className="gray">
        <img className="authImg" src="https://dev-pu8wyk-g.us.auth0.com/img/badge.png" alt="" />
        <h1>Signup</h1>
        </div>
        <div className="link-signUp-login"><Link className="link-login not-active" to={"/a/login"}>Log In</Link> <Link className={activeLogin ? "link-signup  not-active" : "link-signup active"} to={"/a/signup"}>Sign Up</Link></div>
        <form onSubmit={createAccount}>
        <GoogleButton   className="googleButton"  onClick={handleGoogleSignIn}/>
        <div className="or">or</div>
        <div>{input}</div>
        {
            password ?
                <div className="p">
                <PasswordChecklist 
				rules={["minLength","specialChar","number","capital"]}
				minLength={5}
				value={password}
				// valueAgain={passwordAgain}
				onChange={(isValid) => {}}
			/>
                </div>
            :
            null
        }
        <div className="inputbox"><div className="gray input-icon"><img src={passwordicon} alt="" /></div><input type="password"  value={password || ""}  onChange={inputpassword}/><br /></div><br />
        <div className="small">
            <small>
             By signing up, you agree to our terms of service and privacy policy.
            </small>
        </div>
        <button >Sign Up<img src={submit} alt="" /></button><br />      
        </form>
        </div>
    )
}

export default Signup
