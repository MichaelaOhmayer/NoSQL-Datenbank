import React, { useEffect, useState } from "react";

interface BlogData {
    blogs: number;
    comments: number;
    visitors: number;
}

export default function Stats() {
    const [blogData, setBlogData] = useState<BlogData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchBlogData() {
            try {
                const response = await fetch("http://localhost:8081/api/metrics", {
                    method: "GET",
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setBlogData(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchBlogData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
    if (!blogData) return null;

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6"> 
                    <div className="card border-2 text-center mb-3">
                        <div className="card-body">
                            <h4>Anzahl der Aktuellen Blogs: </h4> <br/>
                            <h1 className="align-items-center text-center Anzahl"> {blogData.blogs} </h1>
                        </div>
                    </div>
                </div>

                <div className="col-md-6"> 
                    <div className="card border-2 text-center mb-3">
                        <div className="card-body">
                            <h4>Anzahl der Kommentare: </h4> <br/>
                            <h1 className="align-items-center text-center Anzahl"> {blogData.comments} </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-6"> 
                    <div className="card border-2 text-center mb-3">
                        <div className="card-body">
                            <h4>Anzahl der Besucher: </h4> <br/>
                            <h1 className="align-items-center text-center Anzahl"> {blogData.visitors} </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}