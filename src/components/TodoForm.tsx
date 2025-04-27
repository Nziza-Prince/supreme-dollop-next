import { useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import useAddTodos from '@/hooks/useAddTodos'



const TodoForm = () => {

    const inputRef = useRef<HTMLInputElement>(null)
     const addTodo = useAddTodos(() => {
        if(inputRef.current)
            inputRef.current.value = ''
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
