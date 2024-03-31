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

function BlogElement({ blog }: BlogElementProps) {
    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    return (
        <div className="col-md-4 justify-content-center"> 
            <div className="card border-2 justify-content-center mb-3">
                <div className="card-body">
                    <p><strong>Titel:</strong> {blog.title}</p>
                    <p><strong>Beschreibung:</strong> {blog.content}</p>
                    <p><strong>Autor:</strong> {blog.author}</p>
                    <div className="mt-3 mb-3">
                        <Link to={`/BlogData/${blog.uuid}`}>
                        <button className="btn btn-primary me-2 LoginButton" onClick={() => console.log(blog?.uuid)}>
                        More
                        </button>

                        </Link>
                        <button
                            type="button"
                            className="btn btn-primary LoginButton"
                            onClick={handleDeleteClick}
                        >
                            Löschen
                        </button>
                        {showModal && <DeleteBlog uuid={blog.uuid} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Blogs () {
    const [blogData, setBlogData] = useState<BlogData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBlogData = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/blogs", {
              method: "GET",
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            if (Array.isArray(responseData.data)) {
                setBlogData(responseData.data);
            } else {
                throw new Error('Invalid blog data format');
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching blog data:", error);
            setError("Error fetching blog data");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogData();
    }, []);

    const handleBlogCreated = () => {
        fetchBlogData();
    };
      
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
                    <div className="mb-4"></div>
                    <div className="col-md-12">
                                            </div>
                </div>
                <div className="row">
                    {blogData.map((blog, index) => (
                        <BlogElement key={index} blog={blog}/>
                    ))}
                </div>
                <div className="d-flex justify-content-center">
                    <CreateBlog onBlogCreated={handleBlogCreated} />
                </div>
            </div>
        </>
    );
}
