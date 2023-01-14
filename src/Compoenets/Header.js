import { useState } from "react"
import { Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../auth";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
export const Header = ()=>{
    const [username, setusername] = useState('')
    const [userPhoto, setUserPhoto] = useState('')
    const monitorAuthState = async ()=>{
        onAuthStateChanged(auth, user=>{
          if (user){
            console.log(user);
             const userName = user.displayName;
             const userPhoto = user.photoURL ;
             setUserPhoto(userPhoto)
             setusername(userName);
          }
          else{
            console.log("your logged in");
          }
        })
      }
      const navigate = useNavigate()
        monitorAuthState();
    const logOut = async ()=>{
        await signOut(auth)
       navigate("/a/signup")
     }
    return(
        <div className="header">
            <img src={userPhoto} alt="" /> Welcome, {username}  <div onClick={logOut}>LogOut</div>
        </div>
    )
}