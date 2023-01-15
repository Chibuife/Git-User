import { useCallback, useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme); 
export const MostPopular = ({userObj})=>{
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
const obj = []
if(repoName){
    repoName.forEach((repo)=>{
            obj.push({label: repo.name, value: repo.stargazers_count})

    })


obj.sort(function (x, y) {
    return y.value - x.value;
});
const data = obj.filter((ob, index) => {
    return index === obj.findIndex(o => ob.value === o.value);
  });
data.splice(5)


    // fusion Chart
    // Create a JSON object to store the chart configurations
    const chartConfigs = {
        type: "column2d", // The chart type
        width: "100%", // Width of the chart
        height: "400", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
          // Chart Configuration
          chart: {
            caption: "Most Popular",    //Set the chart caption
            xAxisName: "Repos",           //Set the x-axis name
            yAxisName: "Stars",  //Set the y-axis name
            theme: "fusion",                 //Set the theme for your chart
            paletteColors: "#2caeba, #5D62B5, #FFC533, #F2726F, #8d6e63, #1de9b6, #6E80CA", 
          },
          // Chart Data - from step 2
          data: data
        }
      };
    // Create a JSON object to store the chart configurations

return <ReactFC {...chartConfigs} />;
}
}
