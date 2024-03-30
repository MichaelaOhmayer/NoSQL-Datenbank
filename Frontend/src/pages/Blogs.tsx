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
    visitors: number;
    created: string;
}


function BlogElement({blog}: BlogElementProps) {
    if (!blog) {
        return null;
    }

    const [showModal1] = useState(true);

    return (
        // <>
            <div className="col-md-4 justify-content-center"> 
                <div className="card border-2 justify-content-center mb-3">
                    <div className="card-body">
                        <p>Titel: {blog.title}</p>
                        <p>Beschreibung: {blog.content}</p>
                        <p>Autor: {blog.author}</p>
                        <div className="mt-3 mb-3">
                            <Link to={`/${blog.uuid}`}>
                                {/*fehlt hier nicht wie in Webprog ades /${blog.uuid}? Habs jz mal hinzugefügt */}
                                <button className="btn btn-primary me-2 LoginButton">
                                    More
                                </button>
                            </Link>
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
            </div>
        // </>
    )
}


export default function Blogs () {

    const [blogData, setBlogData] = useState<BlogData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error] = useState<string | null>(null);

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
                console.error("Es konnten keine Blogs geladen werden", error);
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
        // <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="mb-4"></div>
                    <div className="col-md-12">
                        <h3 className="text-center mb-5">Neuen Blog erstellen</h3>
                    </div>
                </div>
                <div className="row">
                    {blogData.map((blog, index) => (
                        <BlogElement key={index} blog={blog}/>
                    ))}
                </div>
                <div className="d-flex justify-content-center"><CreateBlog /></div>
            </div>
        // </>
    )
}