import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddComments from '../Modals/addComment';

interface Comment {
    uuid: string;
    author: string;
    content: string;
    created: string;
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
    const { uuid } = useParams<{ uuid: string }>();
    const [blog, setBlog] = useState<BlogData | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        async function fetchBlog() {
            try{
                const response = await fetch(`http://localhost:8081/api/blogs/${uuid}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const body = await response.json();
                setBlog(body.data);

                const CommentsResponse = await fetch(`http://localhost:8081/api/blogs/${uuid}/comments`);
                if (!CommentsResponse.ok) {
                    throw new Error("Network response was not ok");
                }
                const commentsBody = await CommentsResponse.json();
                const commentsData: Comment[] = commentsBody.data;
                setComments(commentsData);
            } catch (error) {
            console.error("Error fetching blog:", error);
            }
        }
        fetchBlog();
    }, [uuid]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <h3><strong>Blogtitel:</strong> {blog.title}</h3>
                <p></p>
                <p><strong>Inhalt:</strong> {blog.content}</p>
                <p><strong>Autor:</strong> {blog.author}</p>
                <p><strong>Besucheranzahl des Blogs:</strong> {blog.visitors}</p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <h3>Kommentare</h3>
                <p></p>
                <hr/>
                {comments.length > 0 && comments.map((comment, index) => (
                    <div key={index}>
                        <p></p>
                        <p><strong>Autor:</strong> {comment.author}</p>
                        <p><strong>Inhalt:</strong> {comment.content}</p>
                        <p></p>
                        <hr/>
                    </div>
                ))}
            </div>
            <div className="row">
                <AddComments/>
            </div>
        </div>
    );
}
