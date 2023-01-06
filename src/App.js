import logo from './logo.svg';
import './App.css';
import { GitHub } from './Compoenets/GitHub';
import { Languages } from './Compoenets/Languges';
import { MostPopular } from './Compoenets/MostPopular';
import { Stars } from './Compoenets/Stars';
import { Fork } from './Compoenets/Fork';
import { Search } from './Compoenets/Search';
import { useCallback, useEffect, useState } from 'react';
import { Header } from './Compoenets/Header';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Signup from './Compoenets/Signup';
import Login from './Compoenets/Login';
import { Authentication } from './Compoenets/Athentication';
import { PasswordReset } from './Compoenets/PasswordReset';
import { Verification } from './Compoenets/Verfication';
// import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion';
function App() {
  const [usersName, setUserName] = useState("mark");
  const [userObj, setUserObj] = useState();

//  console.log(usersName)
  const input = (e)=> setUserName(e.target.value) 
  
const fetchData =  useCallback( async (usersName)=> {   
    const response = await fetch (`https://api.github.com/users/${usersName}`)
   .then(res => res.json())
   .then(data=>{
       setUserObj(data)
   }
   )
   .catch((error)=>{
    console.log(error)
   })
},[])    
useEffect  ( ()=> {
       fetchData(usersName)
},[usersName])

 if(userObj){
  const name = userObj.name
  // console.log(userObj)
 }

 const router = createBrowserRouter([
  {
    // path: "/",
    // element: <Login/>,
  },
  {
    path: "/a",
    element: <Authentication/>,
    children: [
      {
        path: "/a/login",
        element: <Login/>,
      },
      {
        path: "/a/signup",
        element:    <Signup/>,
        // errorElement:<ErrorPage/>,
      },
      {
        path: "/a/passwordreset",
        element: <PasswordReset/>,
      },
    ],

  },
  {
    path: "/verification",
    element: <Verification/>,
  },
  {
    path: "/home",
    element:
     <div className='body'>
    <Header/>
    <div className='bodyContent'>
    <Search usersName={usersName} input={input}/>
    <GitHub userObj={userObj}/>

    <section className='sectionThree'>
      <div><Languages  userObj={userObj}/></div>
      <MostPopular userObj={userObj}/>
      <div><Stars  userObj={userObj}/></div>
      <Fork userObj={userObj}/>
    </section>
    </div>
    </div>,
  },

]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
