import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface Post{
    id:number,
    title:string,
    body:string,
}

const usePosts = () => {
    const fetchPosts = async() => {
        const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts")
        return response.data.slice(0,10)
  }

  return useQuery({
    queryKey:['posts'],
    queryFn:fetchPosts,
    staleTime:10*1000

})
}

export default usePosts