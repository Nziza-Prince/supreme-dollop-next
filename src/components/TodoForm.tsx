import { useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Todo } from '@/hooks/useTodos'

interface AddTodoContext{
    previousTodos:Todo []
}

const TodoForm = () => {

    const inputRef = useRef<HTMLInputElement>(null)
     
    const queryClient = useQueryClient()
   
    const createTodo = async(todo:Todo) => {
        const res = await axios.post<Todo>("https://jsonplaceholder.typicode.com/todos",todo)
        return res.data
    }

    
    const addTodo = useMutation<Todo,Error,Todo,AddTodoContext>({
        mutationFn:createTodo,
        
        onMutate:(newTodo:Todo) => {
            const previousTodos = queryClient.getQueryData<Todo []>(['todos']) || []
            queryClient.setQueryData<Todo []>(['todos'],todos => [newTodo,...(todos || [])])
            console.log(newTodo)

            if(inputRef.current) 
                inputRef.current.value = ''

            return {previousTodos}
        },

        onSuccess:(savedTodo,newTodo) => {
          queryClient.setQueryData<Todo []>(['todos'],todos => todos?.map(todo => todo === newTodo ? savedTodo : todo))
        },
       
        onError : (error,newTodo,context) => {
            if(!context) return

            queryClient.setQueryData<Todo[]>(['todos'],context.previousTodos)
        }
        
    })

  return (
    <div >
        {addTodo.error && 
        <div className='bg-red-300 p-4 rounded-md'>
            {addTodo.error.message}
            </div>
    }
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
