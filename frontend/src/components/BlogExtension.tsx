// import { useLocation } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom"
import { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { jwtDecode, JwtPayload } from "jwt-decode"


interface CustomJwtPayload extends JwtPayload {
    name?: string;
  }
export const BlogExtension = ({ blog }: { blog: Blog }) => {
    // const location=useLocation();
    const token=localStorage.getItem("token") || "";
    const decoded =jwtDecode<CustomJwtPayload>(token);
    // const { name } = decoded;
    const name=decoded?.name ;
    // const decodedToken=
    // const name=location.state.name;
    const navigate=useNavigate();
    return <div>
        <AppBar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-3xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 font-semibold pt-2">
                       {blog.publishedDate}
                       
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                  { (name) == blog.author.name  ? <Link to="/blogs">
                <button type="button" onClick={async () => {
                        const response=await axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}`,{
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        });
                        console.log(response)
                        navigate(`/blogs`)
                    }} className="mt-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"> Delete</button>
            </Link> 
            : <div></div>
}                </div>
                <div className="col-span-4">
                    <div className="text-slate-500">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability tp grab the user's attention
                            </div>
                            </div>
                        </div>
                </div>

            </div>
        </div>

    </div>
}