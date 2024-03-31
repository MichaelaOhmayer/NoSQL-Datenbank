import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddComments from '../Modals/addComment';

interface Comment {
    uuidComment: string;
    author: string;
    content: string;
}

interface BlogData {
    uuidBlog: string;
    author: string;
    content: string;
    title: string;
    visitors: number;
    created: string;
}

export default function BlogDetails() {
    const { uuidBlog } = useParams<{ uuidBlog?: string }>(); // Machen Sie uuid optional
    const { uuidComment } = useParams<{ uuidComment?: string }>(); // Machen Sie uuid optional
    const [blog, setBlog] = useState<BlogData | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        if (!uuidBlog) return; // Überprüfen, ob uuid vorhanden ist

        async function fetchBlog() {
            try{
                const response = await fetch(`http://localhost:8081/api/blogs/${uuidBlog}`);                       
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: BlogData = await response.json();
                setBlog(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        }

        fetchBlog();
    }, [uuidBlog]);

    useEffect(() => {
        if (!uuidComment) return; // Überprüfen, ob uuid vorhanden ist
    
        async function fetchComments() {
            try {
                const CommentsResponse = await fetch(`http://localhost:8081/api/blogs/${uuidComment}/comments`);
                if (!CommentsResponse.ok) {
                    throw new Error("Network response was not ok");
                }
                const commentsData: Comment[] = await CommentsResponse.json();
                setComments(commentsData);
                console.log(commentsData);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        }
    
        fetchComments();
    }, [uuidComment]);

    if (!blog || !uuidComment) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <p>{blog.author}</p>
                <p>{blog.visitors}</p>
                <h3>Kommentare</h3>
                {comments.length > 0 && comments.map((comment, index) => (
                    <div key={index}>
                        <p>{comment.author}</p>
                        <p>{comment.content}</p>
                    </div>
                ))}
            </div>
            <div className="row">
                <AddComments uuid={uuidComment} blog={blog} />
            </div>
        </div>
    );
}
