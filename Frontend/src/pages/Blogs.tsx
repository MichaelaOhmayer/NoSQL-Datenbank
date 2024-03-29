import { Link } from "react-router-dom";    


function BlogElement() {

    return (
<>

<div className="col-md-4 justify-content-center"> 
    <div className="card border-2 justify-content-center mb-3">
        <div className="card-body">
            <p>Titel: Dinosaurier</p>
            <p>Beschreibung: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            <p>Datum: 11.11.11</p>
            <div className="mt-3 mb-3">
                <Link to={`/BlogDetails`}>
                    <button className="btn btn-primary me-2 LoginButton">
                        More
                    </button>
                </Link>
            </div>
        </div>
    </div>
</div>
</>
    )

}


export default function Blogs () {

    return (
        <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <h1 className="text-center mb-5">MyBlogs</h1>
                </div>
            </div>
            <div className="row">
                <BlogElement />
                <BlogElement />
                <BlogElement />
                <BlogElement />
                <BlogElement />
                <BlogElement />
            </div>
        </div>
        </>
    )

}