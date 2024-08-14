import {  useParams } from "react-router-dom";
import { BlogExtension } from "../components/BlogExtension";
import { useBlog } from "../hooks"
import { Skeleton } from "./Skeleton";
import { AppBar } from "../components/AppBar";

export const Blog = () => {
    const {id}=useParams()
    const {loading, blog}=useBlog({
        id: id || ""
    });

    // const location=useLocation();
    // const {name}=location.state || {};




    if(loading || !blog ){
        return<div>
            <AppBar />
         <div className="flex justify-center">
            <div className="max-w-screen-lg w-full pt-8">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />

            </div>
        </div>
        </div>
    }
    return <div>
        <BlogExtension blog={blog} />
    </div>
}