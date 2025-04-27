import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "../utils/types";
import { CACHE_KEY_TODOS } from "@/utils/constants";
import APIClient from "@/services/apiClient";

const apiClient = new APIClient('/todos')


const useTodos = () => {
      return useQuery<Todo [], Error>({
        queryKey: CACHE_KEY_TODOS,
        queryFn: apiClient.getAll,
        staleTime : 10*1000
      });
}

export default useTodos