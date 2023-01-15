import { useCallback, useEffect, useState } from "react";
// import { Bar, BarChart, CartesianGrid,ComposedChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Bar2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Bar2D, FusionTheme); 
export const Fork = ({userObj})=>{
    const [repoName, setRepoName] = useState();
    const fetchobj =  useCallback( async (name)=> {   
    const response = await fetch (`https://api.github.com/users/${name}/repos`)
       .then(res => res.json())
       .then(obj=>{
          setRepoName(obj)
       }
       )
       .catch((error)=>{
        console.log(error)
       })
   },[])
   useEffect  ( ()=> {
    if(userObj){
        const name = userObj.login
        fetchobj(name)
    }
    
},[userObj])
const obje = [];
if(repoName){
  repoName.forEach((repo)=>{
        obje.push({label: repo.name, value:repo.forks_count})
    })
    obje.sort(function (x, y) {
        return y.value - x.value;
    });
    const data = obje.filter((ob, index) => {
        return index === obje.findIndex(o => ob.value === o.value);
      });
      data.slice(5)
      console.log(data)
    // fusion Chart
    // Create a JSON object to store the chart configurations
const chartConfigs = {
    type: "bar2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Most Forked",    //Set the chart caption
        xAxisName: "Repos",           //Set the x-axis name
        theme: "fusion",                 //Set the theme for your chart
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