import axios from "axios";

const axiosInstance = axios.create({
    baseURL : 'https://jsonplaceholder.typicode.com'
})

class APIClient{
    endpoint : string;

    constructor(endpoint:string){
        this.endpoint = endpoint
    }

    getAll = async <T>() => {
       const res = await axiosInstance.get<T[]>(this.endpoint)
       return res.data
    }

    post = async <T>(todo:T)=>{
        const res = await axiosInstance.post<T>(this.endpoint,todo)
        return res.data
      }
}

export default APIClient