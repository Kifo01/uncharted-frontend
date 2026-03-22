import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import RecentlyViewed from '../components/RecentlyViewed';  // ← ADD THIS IMPORT
import { useRecentlyViewed } from '../context/RecentlyViewedContext';  // ← ADD THIS IMPORT

import banner1 from '../assets/images/banner1.jpg';
import banner2 from '../assets/images/banner2.jpg';
import banner3 from '../assets/images/banner3.jpg';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { addRecentlyViewed } = useRecentlyViewed();  // ← ADD THIS HOOK

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0, 4));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-5"><h3>Loading treasures...</h3></div>;
  }

  return (
    <div className="container fade-in">
      {/* ===== CAROUSEL ===== */}
      <div id="carouselExampleIndicators" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={banner1} className="d-block w-100" alt="Adventure 1" style={{ height: "500px", objectFit: "cover" }} />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold mb-3">Discover Lost Treasures</h2>
            </div>
          </div>
          <div className="carousel-item">
            <img src={banner2} className="d-block w-100" alt="Adventure 2" style={{ height: "500px", objectFit: "cover" }} />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold mb-3">Uncover Ancient Secrets</h2>
            </div>
          </div>
          <div className="carousel-item">
            <img src={banner3} className="d-block w-100" alt="Adventure 3" style={{ height: "500px", objectFit: "cover" }} />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold mb-3">Fortune and Glory Await</h2>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* ===== FEATURED PRODUCTS ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0" style={{ color: '#3b2f2f', fontWeight: 'bold' }}>Available Treasures</h2>
        <Link to="/products" className="btn btn-outline-primary">View All Treasures</Link>
      </div>

      {/* Product Grid */}
      <div className="row">
        {products.map((product) => (
          <div 
            className="col-lg-3 col-md-4 col-sm-6 mb-4" 
            key={product.id}
            onClick={() => addRecentlyViewed(product)} 
            style={{ cursor: 'pointer' }} 
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* ===== RECENTLY VIEWED SECTION ===== */}
      <RecentlyViewed /> 
    </div>
  );
};

export default Home;