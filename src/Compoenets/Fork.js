import { useCallback, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid,ComposedChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
        obje.push({name: repo.name, value:repo.forks_count})
    })
    obje.sort(function (x, y) {
        return y.value - x.value;
    });
    const data = obje.filter((ob, index) => {
        return index === obje.findIndex(o => ob.value === o.value);
      });
      data.slice(5)
      console.log(data)
    const barColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
return(    
<div className="bar">
<ResponsiveContainer width="100%" height="100%">
        
    <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 20, bottom: 0, left: 100 }}
      
    >
    <CartesianGrid horizontal={false} vertical={true} />
    <XAxis
        type="number"
        axisLine={false}
       
    />
    <YAxis
    dataKey="name"
     axisLine={false}
    type="category"
        
    />
    <Tooltip
    // cursor={false}
    />
    <Bar
        dataKey="value"
    >
        {
            data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
            ))
        }
    </Bar>
    </BarChart>
</ResponsiveContainer>
</div>
)
}
}