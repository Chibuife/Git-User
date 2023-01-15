import logo from './logo.svg';
import './App.css';
import { GitHub } from './Compoenets/GitHub';
import { Languages } from './Compoenets/Languges';
import { MostPopular } from './Compoenets/MostPopular';
import { Stars } from './Compoenets/Stars';
import { Fork } from './Compoenets/Fork';
import { Search } from './Compoenets/Search';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
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
import { auth } from './auth';
import { Octokit } from "@octokit/rest" 

let token = "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";
let number= 60;
function App() {
  let [usersName, setUserName] = useState();
  const [userObj, setUserObj] = useState();
  const octokit = new Octokit({     
  });

 console.log(auth)

const fetchData =  useCallback( async (userName)=> {   
  try {
   const { data } =  await octokit.request(`GET /users/{userName}`, {userName})
    console.log(data);
    if(data){
      setUserObj(data);
      number--;
    }

    console.log(number)
  } catch (e) {
    throw new Error(e.message);
  }

},[])  

 const intFetch =  useEffect  ( ()=> {
  if (usersName === undefined){
      fetchData("chibuife")
    }
  else{
      if(usersName){
        fetchData(usersName) 
      }else{
        fetchData("chibuife")
      }
  }

  },[usersName])



 if(userObj){
  const name = userObj.name
 }
//  else{
//   return null
//  }
 const input = (e)=>{
  e.preventDefault()
  console.log(e.target.value)
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
    <Search usersName={usersName} setUserName={setUserName} intFetch={intFetch} />
    <GitHub userObj={userObj}/>
    
    <section className='sectionThree m'>
      {/* <div className='pie'> */}
        <Languages  userObj={userObj}/>
        {/* </div> */}
      {/* <div className='bar'> */}
        <MostPopular userObj={userObj}/>
        {/* </div> */}
      {/* <div className='pie'> */}
        <Stars  userObj={userObj}/>
        {/* </div> */}
      {/* <div className='bar'> */}
        <Fork userObj={userObj}/>
        {/* </div> */}
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
