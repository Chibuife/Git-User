import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../auth";
import { useNavigate } from "react-router-dom";
import { Authentication } from "./Athentication";
export const Header = ()=>{
    const [username, setusername] = useState('')
    const [userPhoto, setUserPhoto] = useState('')

    const monitorAuthState = async ()=>{
        onAuthStateChanged(auth, user=>{
          if (user){
            // console.log(user)
             const userName = user.displayName;
             const userPhoto = user.photoURL ;
             setUserPhoto(userPhoto)
             setusername(userName.toUpperCase());
          
          }
          else{
            console.log("your logged in");
          }
        })
      }
   useEffect(()=>{
    monitorAuthState()
   },[])
  const navigate = useNavigate()      
    const logOut = async ()=>{

      monitorAuthState()
        await signOut(auth)
       navigate("/a/signup")
     }
   
    return(
        <div className="header">
            <img src={userPhoto} alt="" /> Welcome, <span className="userName">{username} </span> <div onClick={logOut}>LogOut</div>
        </div>

    )
}