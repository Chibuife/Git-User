// your-component.jsx

import { useCallback, useEffect, useState } from 'react'
import GithubLanguages from 'react-github-languages'
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import FusionCharts from "fusioncharts";
import Pie2D from "fusioncharts/fusioncharts.charts";
import ReactFC from 'react-fusioncharts';
ReactFC.fcRoot(FusionCharts, Pie2D, FusionTheme); 
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
         const chartConfigs = {
          type: "Pie2D", // The chart type
          width: "100%", // Width of the chart
          height: "400", // Height of the chart
          dataFormat: "json", // Data type
          dataSource: {
            // Chart Configuration
            "chart": {
              "caption": "Languages",
              "showPercentValues": "1",
              "decimals": "1",
              "useDataPlotColorForLabels": "1",
              "theme": "fusion",
              paletteColors:
              "#2caeba, #5D62B5, #FFC533, #F2726F, #8d6e63, #1de9b6, #6E80CA",
          },
            // Chart Data - from step 2
            data: data
          }
        };
      return(
      <ReactFC {...chartConfigs} />
      ) 
     
                }
    
}