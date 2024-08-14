import { Link } from "react-router-dom";

interface BlogCardProps {
    id: number
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {

    
    return <Link to={`/blog/${id}`}>
        
        <div className="pl-4 p-4 w-screen max-w-screen-lg cursor-pointer" >
        <div >

           <div className="flex font-bold mr-4"> <Avatar name={authorName} /> {authorName}  {publishedDate}</div> 
        </div>
        <div className="font-bold text-2xl text-blue-700"> 
            {title}
        </div>
        <div className="font-thin text-md">
            {content.length> 100 ? content.slice(0,100) + "..." : content}
        </div>

        <div className="w-full text-slate-400 text-sm font-thin pt-2 ">
            { Math.ceil(content.length/100) > 1 ?   Math.ceil(content.length/100) + " mins read" :  Math.ceil(content.length/100) + " min read" }
        </div>
        <div className="border border-slate-200 "></div>                                                                                                                 
    </div>
    </Link>
}
function findOutSpace({name} : {name: string})
    {
        const spaceIndex = name.indexOf(' ')
        if(spaceIndex != -1 && spaceIndex < name.length -1)
            {
                return spaceIndex;
            }
            else{
                return -1;
            }
    }
 
export function Avatar({name} : {name: string})
{
    const spaceIndex=findOutSpace({name})
    return <div className="mr-2 relative font-bold inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{spaceIndex != -1 ? name[0] + name[spaceIndex + 1] : name[0]}</span>
</div>
}