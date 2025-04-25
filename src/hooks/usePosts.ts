import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface Post{
    id:number,
    title:string,
    body:string,
    userId:number
}

interface PageQuery{
    page:number,
    pageSize : number
}

const usePosts = (query:PageQuery) => {
    const fetchPosts = async() => {
        const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts",{
            params:{
             _start : (query.page - 1) * query.pageSize,
             _limit : query.pageSize
            }
        })
        return response.data.slice(0,10)
  }

  return useQuery({
    queryKey:['posts',query],
    queryFn:fetchPosts,
    staleTime:10*1000
})
}

export default usePosts