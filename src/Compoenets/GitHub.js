import Gist from "./Gist.svg"
import following from "./following.svg"
import followers from "./followers.svg"
import repo from "./repo.svg"
import blog from "./blog.svg"
import location from "./location.svg"
import company from "./company.svg"
import { useCallback, useEffect, useState } from "react"

export  const  GitHub = ({userObj})=>{
  
    const [user, setUser] = useState();
    if(userObj){
        
        return(
            <>
            <section className="sectionOne">
            <div className="infoBox"><div className="size pink"><img src={repo} alt="" /> </div> <div><h3>{userObj.public_repos}</h3> <span >Repos</span> </div> </div>
           
            <div className="infoBox"><div className="size green"><img src={followers}alt="" /></div> <div><h3>{userObj.followers}</h3> <span>Followers</span></div></div>
          
            <div className="infoBox"><div className="size purple"><img src={following}alt="" /></div> <div><h3>{userObj.following}</h3> <span>Following</span></div></div>
       
            <div className="infoBox"><div className="size yellow"><img src={Gist} alt="" /> </div> <div><h3>{userObj.public_gists}</h3> <span>Gists</span></div></div>
            </section>

        <section className="sectionTwo">
          
            <div>
            <div className="whitebackground topbox">{userObj.type} </div>
                <div className="userDetail largerWidth">
                  
                 
                    <div className="personnalinfo">
                   
                    <div className="userImage"> <img src={userObj.avatar_url} alt="" />
                    <div className="name-twitter">
                    <div>{userObj.name}</div>
                    <div className="twitter">@{userObj.twitter_username}</div>
                    </div>
                    </div>
                    
                    <div className="follow">
                        <a href={userObj.html_url} target="_blank">Follow</a>
                    </div>
                    </div>
                    <div className="about">
                    <div><img src={company} alt="" />{userObj.company}</div>
                    <div><img src={location} alt="" />{userObj.location}</div>
                    <div><img src={blog} alt="" /><a href={userObj.blog} target="_blank">{userObj.blog}</a></div>
                    </div>
                    </div>
                 </div>
            <div className="f">
                <div className="whitebackground topbox">followers</div>
                <div className="userDetail overflowscroll">
                <UserFollowersComp userObj={userObj}/>
                </div>
            </div>
        </section>
            </>
        )
     
    }
}

const UserFollowersComp= ({userObj})=>{
    const [userFollowers,setUserFollowers] = useState();
    const name = userObj.login
    const fetchUserFollowersData =  useCallback( async (name)=> {   
        const response = await fetch (`https://api.github.com/users/${name}/followers`)
       .then(res => res.json())
       .then(data=>{
        setUserFollowers(data)
       }
       )
       .catch((error)=>{
        console.log(error)
       })
    },[])
    useEffect  ( ()=> {
        fetchUserFollowersData(name)
    },[userObj])

    if(userFollowers){
        return(
            <>
            {userFollowers.map((item)=>{
                return(
                    <div className="followersdetail">
                        <img src={item.avatar_url} alt="" />
                        <span>
                        <h4>{item.login}</h4>
                        <a href={item.html_url} target="_blank">{item.html_url}</a>
                        </span>
                    </div>  
                )
            })}           
            </>
        )
    }
}