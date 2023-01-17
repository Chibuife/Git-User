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
import { auth } from './auth';
import { Octokit } from "@octokit/rest" 
import { FirstPage } from './Compoenets/FirstPage';

// let token = "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";
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
    setTimeout(
      ()=>{
        if(data){
          setUserObj(data);
          console.log(data)
          number--;
        }
      }, 3000)
 

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
    path: "/",
    element: <FirstPage/>,
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
        element:    <Signup/>,      },
      {
        path: "/a/passwordreset",
        element: <PasswordReset/>,
      },
    ],
  },
  {
    path: "/home",
    element:
     <div className='body'>
    <Header/>
    <div className='bodyContent'>
    <div className='search-count'>
    <Search usersName={usersName} setUserName={setUserName} intFetch={intFetch} />
    <div className='count'>{number}/60</div>
    </div>
    <GitHub userObj={userObj}/>
    
    <section className='sectionThree'>
      <div className='pie'>
        <Languages  userObj={userObj}/>
        </div>
      <div className='bar'>
        <MostPopular userObj={userObj}/>
        </div>
      <div className='pie'>
        <Stars  userObj={userObj}/>
        </div>
      <div className='bar'>
        <Fork userObj={userObj}/>
        </div>
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
