import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";



export interface Blog{
    "content": string,
    "title": string,
    "id": number,
    "author": {
        "name": string
    }
    "publishedDate": string

}

export const useBlog = ({id}: {id: string}) => {

    const [loading, setLoading] = useState(true);
    const [blog, setBlog]=useState<Blog>();
    useEffect(() => {

        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(resp => {
            console.log(resp.data.blog)
            setBlog(resp.data.blog)
            setLoading(false)
        })
    },[id])
    return  {
        loading,
        blog
    }
}


export const useBlogs = () => {

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs]=useState<Blog[]>([]);
    useEffect(() => {

        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(resp => {
            // console.log(resp)
            setBlogs(resp.data.blogs)
            setLoading(false)
        })
    })
    return  {
        loading, 
        blogs
    }
}
