import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface Post{
    id:number,
    title:string,
    body:string,
    userId:number
}

const usePosts = (userId:number | undefined) => {
    const fetchPosts = async() => {
        const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts",{
            params:{
                userId
            }
        })
        return response.data.slice(0,10)
  }

  return useQuery({
    queryKey:userId ? ['users',userId,'posts']:['posts'],
    queryFn:fetchPosts,
    staleTime:5*60*1000

})
}

export default usePosts