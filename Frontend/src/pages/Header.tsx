import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (blog: React.FormEvent) => {
    blog.preventDefault(); // Prevent the form from being submitted in the traditional way
    try {
      const response = await fetch(`http://localhost:8081/api/blogs?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Response:", response);
      const data = await response.json();
      if (data && data.length > 0) {
        navigate(`/BlogDetails/${data[0].id}`); // Navigate to the first blog that matches the search
      } else {
        console.error("No blogs found for the search term:", searchTerm);
      } 
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };


  return (
    <>
      <div className="container">
        <header className="py-3 mb-2 border-bottom">
          <div className="container d-flex flex-wrap justify-content-center">
            <Link to="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
              <svg className="bi me-2" width="40" height="32"><use href="#bootstrap"></use></svg>
              <img
                src="../../Logo.png"
                alt="Logo"
                className="img-fluid logo-small"
                id="Logo"
              />
            </Link>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0" role="search" onSubmit={handleSearch}>
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          <div className="row justify-content-center Eventplanner">
          Blogs</div>
        </header>
      </div>
  
      <div className="container mb-5">
        <div className="row">
          <nav className="navbar justify-content-center">
            <ul className="nav">
              <li className="nav-item px-3">
                <Link to="/" className="nav-link link-body-emphasis px-2 active Reiter" aria-current="page">Blogs</Link>
              </li>
              <li className="nav-item px-3">
                <Link to="/Statistics" className="nav-link link-body-emphasis px-2 Reiter">Statistiken</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}