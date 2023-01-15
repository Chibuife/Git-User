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
import { auth } from './auth';
import { Octokit } from "@octokit/rest" 

let token = "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";

// import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion';
function App() {
  let [usersName, setUserName] = useState();
  const [userObj, setUserObj] = useState();

  // console.log(usersName)
  const octokit = new Octokit({     
    // auth: "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",    
    // userAgent: 'skylight v1' 
  });

 console.log(auth)

const fetchData =  useCallback( async (userName)=> {   
  try {
   const { data } =  await octokit.request(`GET /users/{userName}`, {
      userName
    })
    console.log(data);
    setUserObj(data)
  } catch (e) {
    throw new Error(e.message);
  }
  //   response.json()
  //  .then(res => res.json())
  //  .then(data=>{
  //      setUserObj(data)
  //  }
  //  )
  //  .catch((error)=>{
  //   console.log(error)
  //  })
},[])  
// let intFetch;
// console.log(usersName)

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

    <section className='sectionThree'>
      <div className='pie'><Languages  userObj={userObj}/></div>
      <div className='bar'><MostPopular userObj={userObj}/></div>
      <div className='pie'><Stars  userObj={userObj}/></div>
      <div className='bar'><Fork userObj={userObj}/></div>
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
