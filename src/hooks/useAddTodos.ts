import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { CACHE_KEY_TODOS } from "../utils/constants"
import { Todo } from "../utils/types"

interface AddTodoContext{
    previousTodos:Todo []
}

const useAddTodos = (addNewTodo : () => void) => {
    const queryClient = useQueryClient()
   
    const createTodo = async(todo:Todo) => {
        const res = await axios.post<Todo>("https://jsonplaceholder.typicode.com/todos",todo)
        return res.data
    }

    
    return useMutation<Todo,Error,Todo,AddTodoContext>({
        mutationFn:createTodo,
        
        onMutate:(newTodo:Todo) => {
            const previousTodos = queryClient.getQueryData<Todo []>(CACHE_KEY_TODOS) || []
            queryClient.setQueryData<Todo []>(CACHE_KEY_TODOS,todos => [newTodo,...(todos || [])])
            console.log(newTodo)

         addNewTodo()

            return {previousTodos}
        },

        onSuccess:(savedTodo,newTodo) => {
          queryClient.setQueryData<Todo []>(CACHE_KEY_TODOS,todos => todos?.map(todo => todo === newTodo ? savedTodo : todo))
        },
       
        onError : (error,newTodo,context) => {
            if(!context) return

            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS,context.previousTodos)
        }
        
    })
}

export default useAddTodos