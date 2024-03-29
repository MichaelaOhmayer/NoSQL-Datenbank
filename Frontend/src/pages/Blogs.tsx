import { Link } from "react-router-dom";    
import { useEffect, useState } from "react";
import CreateBlog from "../Modals/createBlog";
import DeleteBlog from "../Modals/deleteBlog";

interface BlogElementProps {
    blog: BlogData;
}

interface BlogData {
    uuid: string;
    author: string;
    content: string;
    title: string;
    visitors: string;
    createdAt: string;
}



function BlogElement({blog}: BlogElementProps) {

    if (!blog) return null;

    const [showModal1] = useState(true);


    return (

<>
<div className="col-md-4 justify-content-center"> 
    <div className="card border-2 justify-content-center mb-3">
        <div className="card-body">
            <p>Titel: {blog.title}</p>
            <p>Beschreibung: {blog.content}</p>
            <div className="mt-3 mb-3">
                <Link to={`/BlogDetails`}>
                    <button className="btn btn-primary me-2 LoginButton">
                        More
                    </button>
                </Link>
            </div>
            <button
              type="button"
              className="btn btn-primary LoginButton"
              data-bs-toggle="modal"
              data-bs-target={`#staticBackdrop-${blog.uuid}`}
            
            >Löschen</button>
            {showModal1 && <DeleteBlog uuid={blog.uuid} />}
        </div>
    </div>
</div>
</>
    )

}


export default function Blogs () {

    const [blogData, setBlogData] = useState<BlogData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchBlogData() {
            try {
                const response = await fetch("http://localhost:8081/api/blogs", {
                  method: "GET",
                });
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlogData(data);
                setLoading(false);
              } catch (error) {
                console.error("Es konnten keine Events geladen werden", error);
                setLoading(false);
              }
            }
            console.log({Blogs: blogData});

            fetchBlogData();
        }, []);
      
        if (loading) {
          return <div>Loading...</div>;
        }
      
        if (error) {
          return <div>Error: {error}</div>;
        }

    return (
        <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <h1 className="text-center mb-5">MyBlogs</h1>
                </div>
            </div>
            <div className="row">
                {blogData.map((blog, index) => (
                <BlogElement key={index} blog={blog}/>
                ))}
            </div>
            <div className="d-flex justify-content-center"><CreateBlog /></div>
        </div>
        </>
    )

}