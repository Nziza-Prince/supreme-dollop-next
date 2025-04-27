import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "../utils/types";
import { CACHE_KEY_TODOS } from "@/utils/constants";
import APIClient from "@/services/apiClient";

const apiClient = new APIClient('/todos')


const useTodos = () => {
    const fetchTodos = async () => {
        const res = await axios.get<Todo[]>(
          "https://jsonplaceholder.typicode.com/todos"
        );
        return res.data.slice(0, 15);
      };

      return useQuery({
        queryKey: CACHE_KEY_TODOS,
        queryFn: apiClient.getAll,
        staleTime : 10*1000
      });
}

export default useTodos