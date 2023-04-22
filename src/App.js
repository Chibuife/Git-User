import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';
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
import Error from './Compoenets/404';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './auth';
import Body from './Compoenets/Body';

let number = 60;
function App() {
  const [login, setLogin] = useState(false)
  const [userObj, setUserObj] = useState();
  const [error, setError] = useState();
  const [loader, setLoader] = useState(true)
  const octokit = new Octokit({});
  const inputRef = useRef();


  const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
      if (user) {

        setLogin(true)

      }
      else {
        console.log("your not logged in");
      }
    })
  }
  useEffect(() => {
    monitorAuthState()
  }, [])
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = useCallback(async (userName) => {
    try {
      const { data } = await octokit.request(`GET /users/${userName ? userName : 'chibuife'}`, { userName })
         setLoader(true)
          if (data) {
            setUserObj(data);
            console.log(data)
            number--;
            setLoader(false)
          }
      setError() 
    } catch (e) {
      console.log(e.message)
      let error =  e.message == 'Not Found' ? setError('User does not exist') : null
    }

  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <FirstPage />,
    },
    {
      path: "*",
      element: <Error />,
    },
    {
      path: "/a",
      element: <Authentication />,
      children: [
        {
          path: "/a/login",
          element: <Login />,
        },
        {
          path: "/a/signup",
          element: <Signup />,
        },
        {
          path: "/a/passwordreset",
          element: <PasswordReset />,
        },
      ],
    },

    {
      path: "/home",
      element:
        login ?
          <Body userObj={userObj} inputRef={inputRef} fetchData={fetchData} error={error} number={number} loader={loader}/>
          : <Error />
    },

  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
