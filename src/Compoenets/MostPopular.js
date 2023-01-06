
import { useCallback, useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid,ComposedChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
            obj.push({name: repo.name, value: repo.stargazers_count})

    })


obj.sort(function (x, y) {
    return y.value - x.value;
});
const data = obj.filter((ob, index) => {
    return index === obj.findIndex(o => ob.value === o.value);
  });
data.splice(5)
console.log(data)
const barColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

return (
    <div className="bar">
    <ResponsiveContainer
     width="100%" 
     height='100%'
     >
        
        <BarChart
            data={data.slice()}
            // margin={{ top: 20, right: 20, left: 20, bottom: 5, }}
          
        >
            <CartesianGrid horizontal={true} vertical={false} />
        <XAxis
            dataKey="name"
            axisLine={false}
           
        />
        <YAxis
         axisLine={false}
            
        />
        <Tooltip
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
);
}
}
