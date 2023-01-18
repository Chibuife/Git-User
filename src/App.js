import './App.css';
import { GitHub } from './Compoenets/GitHub';
import { Languages } from './Compoenets/Languges';
import { MostPopular } from './Compoenets/MostPopular';
import { Stars } from './Compoenets/Stars';
import { Fork } from './Compoenets/Fork';
import { Search } from './Compoenets/Search';
import { useCallback, useEffect,useRef, useState } from 'react';
import { Header } from './Compoenets/Header';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './Compoenets/Signup';
import Login from './Compoenets/Login';
import { Authentication } from './Compoenets/Athentication';
import { PasswordReset } from './Compoenets/PasswordReset';
import { Octokit } from "@octokit/rest" 
import { FirstPage } from './Compoenets/FirstPage';

let number= 60;
function App() {
  const [userObj, setUserObj] = useState();
  const octokit = new Octokit({     
  });
  const inputRef = useRef();
  const [userNameRef , setUserNameRef] = useState();
console.log(userNameRef)
  const [usersName, setUserName] = useState()
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

 useEffect  ( ()=> {
  if (userNameRef === undefined){
      fetchData("chibuife")
    }
  else{
      if(userNameRef){
        fetchData(userNameRef) 
      }else{
        fetchData("chibuife")
      }
  }

  },[userNameRef])



 if(userObj){
  const name = userObj.name
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
    <Search inputRef={inputRef} setUserName={setUserName} usersName={usersName} setUserNameRef={setUserNameRef}/>
    <div className='count'>{number}/60</div>
    </div>
     {
        userObj ? <div className='display-relative'>
        
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
        </div> :<div className='myLoader'><span className="loader"></span></div>
      }

    </div>
    
    </div>,
  },

]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
