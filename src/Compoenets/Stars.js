import { useCallback, useEffect, useState } from "react"
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import doughnut2d from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, doughnut2d, FusionTheme);
export const Stars = ({userObj})=>{
    const [repoObject, setRepoObject] = useState();

    const fetchobj =  useCallback( async (name)=> {   
        const response = await fetch (`https://api.github.com/users/${name}/repos`)
       .then(res => res.json())
       .then(obj=>{
        //   console.log(obj.stargazers_count)
          setRepoObject(obj)
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
const array = []
const test= []
const obj = {}
let val;
let data=[]
if(repoObject){
    repoObject.map((element,index) => {
     
    if(!obj[element.language] && element.language ){
        obj[element.language] = element.stargazers_count;
        
        test.push(element.language)
    }
    else if(obj[element.language] && element.language){
   
    obj[element.language] += element.stargazers_count;
    }
          
        
    });
    let value_obj = Object.values(obj)

function removeDuplicates(test) {
    return test.filter((item, 
        index) => test.indexOf(item) === index);
}


let myTest = removeDuplicates(test);

    value_obj.forEach((val,index)=>{
        
        data.push({name: myTest[index], value: val})
     }
     )
  
     const chartConfigs = {
      type: "doughnut2d", // The chart type
      width: "100%", // Width of the chart
      height: "400", // Height of the chart
      dataFormat: "json", // Data type
      dataSource: {
        chart: {
          caption: "Stars Per Language",    //Set the chart caption
          theme: "fusion",                 //Set the theme for your chart
          paletteColors:
          "#2caeba, #5D62B5, #FFC533, #F2726F, #8d6e63, #1de9b6, #6E80CA",
        },
        data: data
      }
    };
    return(
      <ReactFC {...chartConfigs} />
      ) 
}
console.log(data)

}