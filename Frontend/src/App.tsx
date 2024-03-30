import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Stats from './pages/Stats';

function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/BlogData/:uuid" element={<BlogDetails />} />
        <Route path="/Statistics" element={<Stats />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRouter;
