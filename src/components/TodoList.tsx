import axios from "axios"
import { useEffect, useState } from "react"

interface Todo{
 title:string,
 description:string,
 isCompleted:boolean
}

const TodoList = () => {
    
    const [todos,setTodos] = useState<Todo[]>([])
    const [error,setError] = useState('')
    
    useEffect(()=>{
      try{

        const fetchTodos = ()=>{
          const response = axios.get("https://jsonplaceholder.typicode.com/todos")
          setTodos(response.data)
        }
      }catch(err){
        console.log(err)
      }
    })
  return (
    <div>
      <h1>{todos}</h1>
    </div>
  )
}

export default TodoList
