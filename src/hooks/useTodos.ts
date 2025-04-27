import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "../utils/types";



const useTodos = () => {
    const fetchTodos = async () => {
        const res = await axios.get<Todo[]>(
          "https://jsonplaceholder.typicode.com/todos"
        );
        return res.data.slice(0, 15);
      };

      return useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
        staleTime : 10*1000
      });
}

export default useTodos