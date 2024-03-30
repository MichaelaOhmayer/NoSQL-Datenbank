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
                const response = await fetch(`http://localhost:8081/api/blogs/${uuid}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: blog?.title,
                        content: blog?.content,
                        author: blog?.author,
                        visitors: blog?.visitors,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setBlog(data);

                const CommentsResponse = await fetch(`http://localhost:8081/api/blogs/${uuid}/comments`);
                if (!CommentsResponse.ok) {
                    throw new Error("Network response was not ok");
                }
                const commentsData: Comment[] = await CommentsResponse.json();
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
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <p>{blog.author}</p>
                <p>{blog.visitors}</p>
                <p></p>
                <h3>Kommentare</h3>
                {comments.length > 0 && comments.map((comment, index) => (
                    <div key={index}>
                        <p>{comment.author}</p>
                        <p>{comment.content}</p>
                    </div>
                ))}
            </div>
            <div className="row">
                <AddComments/>
            </div>
        </div>
    );
}


/*
function Comment({ text, isMyComment }) {
    const alignment = isMyComment ? 'justify-content-end' : 'justify-content-start';
    return (
        <div className={`row ${alignment}`}>
            <div className='col-auto mt-2'>
                <div className="card"> 
                    <div className="card-body py-2">
                        <p className="card-text">{text}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function BlogDetails() {
    const { uuid } = useParams();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState(['Dinos sind so cool ich muss mehr sehen!']);
    const [myComments, setMyComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/blogs/${uuid}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setBlog(data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        fetchBlog();
    }, [uuid]);

    const handleSubmit = (blog) => {
        blog.preventDefault();
        setMyComments([...myComments, newComment]);
        setNewComment('');
    }

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="containerSmall">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <h3>Titel: {blog.title}</h3>
                        <p>Beschreibung:</p> <br />
                        <p>{blog.content}</p>

                        <div className="mt-5">
                            <h4>Kommentare:</h4>
                            {comments.map((comment) => <Comment text={comment} isMyComment={false} />)}
                            {myComments.map((comment) => <Comment text={comment} isMyComment={true}/>)}
                        </div>

                        <div className="col-md-8 mt-5 mx-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mt-5">
                                    <span className="input-group-text">Chat!</span>
                                    <textarea className="form-control" aria-label="With textarea" value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
                                    <button type="submit" className="btn btn-primary LoginButton">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
*/