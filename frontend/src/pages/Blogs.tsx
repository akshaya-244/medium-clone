import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { Skeleton } from "./Skeleton";

export const Blogs = () =>{
    const {loading, blogs} = useBlogs();
    // const location=useLocation();
    // const {getUsername}=location.state;

  

    
    if(loading){
        return  <div>
        <AppBar  />
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
    <AppBar  />
    <div className="flex justify-center">
        
     <div className="">
        {
            blogs.map(blog   => <BlogCard id={blog.id} authorName={blog.author.name || "John Doe"} title={blog.title} content={blog.content} publishedDate={blog.publishedDate}/>
            )}
        {/* <BlogCard authorName="Akshaya Mohan" title="How an ugly single webpage makes $5000 a month without affiliate marketting" content="How an ugly single webpage makes $5000 a month without affiliate marketting" publishedDate="04-06-2024"/>
        <BlogCard authorName="John Doe" title="My second Blog" content="This is my second blog" publishedDate="04-06-2024"/> */}

    </div>
    </div>
    </div>


} 