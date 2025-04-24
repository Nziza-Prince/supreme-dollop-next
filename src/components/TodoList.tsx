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
      const fetchTodos = async () => {
      try{
          const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
        
        }catch(err){
          console.log(err)
        }
      }

      fetchTodos()
    },[])
  return (
    <div>
      <ul>

      </ul>
    </div>
  )
}

export default TodoList
