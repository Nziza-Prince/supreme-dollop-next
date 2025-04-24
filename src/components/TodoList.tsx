import axios from "axios"
import { useEffect, useState } from "react";

interface Todo{
  id:number;
  title:string;
  completed:boolean
}

const TodoList = () => {

  const [todos,setTodos] = useState<Todo[]>([])
  const [error,setError] = useState('')

  useEffect(()=>{
    const fetchTodos = async ()=>{
      try{

        const response = await axios.get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
        setTodos(response.data.slice(0,10))
      }catch(e:any){
        setError("Failed to fetch the todos")
        console.error(e.message)
      }
    }
    fetchTodos()
  },[])

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">📝 Todo List</h2>
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <ul className="space-y-3">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`p-4 rounded-lg shadow flex items-center justify-between ${
              todo.completed ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <span className="text-gray-700">{todo.title}</span>
            <span className={`text-sm font-semibold ${
              todo.completed ? "text-green-600" : "text-red-600"
            }`}>
              {todo.completed ? "✅ Done" : "❌ Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
