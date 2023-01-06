import { useCallback, useEffect, useState } from "react"
import { Cell, Pie, PieChart, Tooltip } from "recharts";

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
     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    let renderLabel = function(data) {
        return data.name;
    }
     return(
        <>
         <PieChart width={350} height={350}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                // fill="#8884d8"
                dataKey="value"
                label={renderLabel}
                innerRadius={60}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip/>
            </PieChart>
        </>
     )
}
console.log(data)

}