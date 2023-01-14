// your-component.jsx

import { useCallback, useEffect, useState } from 'react'
import GithubLanguages from 'react-github-languages'
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';


export const Languages = ({userObj}) => {
    const [userLang, setUserLanguge] = useState()
    const [index, setindex] = useState()
  
    const fetchData =  useCallback( async (name)=> {   
        const response = await fetch (`https://api.github.com/users/${name}/repos`)
       .then(res => res.json())
       .then(data=>{
        setUserLanguge(data)
       }
       )
       .catch((error)=>{
        console.log(error)
       })
   },[])
useEffect  ( ()=> {
  
    if(userObj){const name = userObj.login
    fetchData(name)}
    },[userObj])
    useEffect  ( ()=> {
        },[userLang])

    if(userLang){

        let obj = Object.values(userLang)
       
        let lang;
        let languages;
        for(let key in obj ){
            languages = obj[key]
         }
         let language_obj= {};
         let angue = []
         const data = [ ]
         userLang.forEach((repo, index) => {
            if (repo.language){
                // if(!language_obj[index]){
                // }else{
                //     console.log('ok')
                // }
                if (!language_obj[repo.language]){
                    language_obj[repo.language] = 1  
                   angue.push(repo.language)
                }else{
                    language_obj[repo.language] += 1
                }
                  
                
            }
           
         });
        
         let value_obj = Object.values( language_obj)
      
       
         value_obj.forEach((val,index)=>{
            data.push({name: angue[index], value: val})
         }
         )
         console.log(data)
         const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
         let renderLabel = function(data) {
            return data.name;
        }
        return (
            
            <PieChart width={350} height={350}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={renderLabel}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip/>
            </PieChart>
        
          );
                }
    
}