import { useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Todo } from '@/hooks/useTodos'

const TodoForm = () => {

    const inputRef = useRef<HTMLInputElement>(null)
     
    const queryClient = useQueryClient()
    const createTodo = async(todo:Todo) => {
        const res = await axios.post<Todo>("https://jsonplaceholder.typicode.com/todos",todo)
        return res.data
    }

    const addTodo = useMutation({
        mutationFn:createTodo,
        onSuccess:(savedTodo,newTodo) => {
            queryClient.setQueryData<Todo []>(['todos'],todos => [savedTodo,...(todos || [])])
            console.log(savedTodo)
        }
    })

  return (
    <div >
      <form className="flex gap-4 max-w-xl mx-auto p-6 mt-10" onSubmit={(event)=>{
        event.preventDefault()
        if(inputRef.current && inputRef.current.value){
            addTodo.mutate({
                id:1,
                title:inputRef.current.value,
                completed:true,
                userId:1
            })
        }
        
      }}>
    <Input ref={inputRef} type="text" />
          <Button className='cursor-pointer' type='submit' color='blue'>Add</Button>
      </form>
    </div>
  )
}

export default TodoForm
