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
      const fetchTodos = ()=>{
        const response = axios.get("https://jsonplaceholder.typicode.com/todos")
        console.log(response)
      }
    })
  return (
    <div>
      
    </div>
  )
}

export default TodoList
