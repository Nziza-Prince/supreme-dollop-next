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
          
        }
    })
  return (
    <div>
      
    </div>
  )
}

export default TodoList
