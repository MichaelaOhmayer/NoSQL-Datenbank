import { useEffect, useState } from "react";

interface CounterData {
    blogs: number;
    comments: number;
    visitors: number;
}

interface ResponseData {
    data: CounterData;
}

export default function Stats() {
    const [counterData, setCounterData] = useState<CounterData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchCounterData() {
            try {
                const response = await fetch("http://localhost:8081/api/metrics");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: ResponseData = await response.json();
                console.log("Received data: ", data);
                setCounterData(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError(true);
                setLoading(false);
            }
        }
        fetchCounterData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
    if (!counterData) return null;

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6"> 
                    <div className="card border-2 text-center mb-3">
                        <div className="card-body">
                            <h4>Anzahl der Aktuellen Blogs: </h4> <br/>
                            <h1 className="align-items-center text-center Anzahl"> {counterData.blogs} </h1>
                        </div>
                    </div>
                </div>

                <div className="col-md-6"> 
                    <div className="card border-2 text-center mb-3">
                        <div className="card-body">
                            <h4>Anzahl der Kommentare: </h4> <br/>
                            <h1 className="align-items-center text-center Anzahl"> {counterData.comments} </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-6"> 
                    <div className="card border-2 text-center mb-3">
                        <div className="card-body">
                            <h4>Anzahl der Besucher: </h4> <br/>
                            <h1 className="align-items-center text-center Anzahl"> {counterData.visitors} </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
