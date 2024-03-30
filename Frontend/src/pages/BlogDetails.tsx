import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddComments from '../Modals/addComment';

interface Comment {
    uuid: string;
    author: string;
    content: string;
}

interface BlogData {
    uuid: string;
    author: string;
    content: string;
    title: string;
    visitors: number;
    created: string;
}

export default function BlogDetails() {
    const { uuid } = useParams<{ uuid?: string }>();
    const [blog, setBlog] = useState<BlogData | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        if (!uuid) return;

        async function fetchBlog() {
            try{
                const response = await fetch(`http://localhost:8081/api/blogs/${uuid}`);                       
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setBlog(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        }

        fetchBlog();
    }, [uuid]);

    useEffect(() => {
        if (!uuid) return;
    
        async function fetchComments() {
            try {
                const CommentsResponse = await fetch(`http://localhost:8081/api/blogs/${uuid}/comments`);
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
    }, [uuid]);

    if (!blog || !uuid) {
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
                <AddComments uuid={uuid} />
            </div>
        </div>
    );
}