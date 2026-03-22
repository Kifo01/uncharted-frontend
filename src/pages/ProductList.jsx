import { useState, useEffect, useRef } from "react";
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState("All");
  
  // Infinite Scroll
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const PRODUCTS_PER_PAGE = 6;
  const loaderRef = useRef(null);

  const categories = ["All", "Replicas", "Games", "Apparel", "Accessories", "Collectibles"];

  // Fetch from backend
  useEffect(() => {
    fetch('https://uncharted-backend-ybcf.onrender.com/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setDisplayedProducts(data.slice(0, PRODUCTS_PER_PAGE));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !skeletonLoading) {
        loadMoreProducts();
      }
    }, { threshold: 0.5 });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [displayedProducts, filteredProducts, skeletonLoading]);

  const loadMoreProducts = () => {
    setSkeletonLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = 0;
      const endIndex = nextPage * PRODUCTS_PER_PAGE;
      const newProducts = filteredProducts.slice(startIndex, endIndex);
      
      if (newProducts.length > displayedProducts.length) {
        setDisplayedProducts(newProducts);
        setPage(nextPage);
      }
      setSkeletonLoading(false);
    }, 500);
  };

  // Search, Filter, Sort Logic
  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter(product => product.category === selectedCategory);
    }

    if (priceRange !== "All") {
      const [min, max] = priceRange.split("-").map(Number);
      result = result.filter(product => product.price >= min && product.price <= max);
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
    setDisplayedProducts(result.slice(0, PRODUCTS_PER_PAGE));
    setPage(1);
  }, [searchTerm, selectedCategory, sortBy, priceRange, products]);

  if (loading) {
    return (
      <div className="container py-4">
        <div className="row">
          {[...Array(6)].map((_, i) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={i}>
              <SkeletonCard />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container fade-in py-4">
      <h2 className="mb-4">Nathan Drake's Collection</h2>

      {/* Search, Filter, Sort Controls */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="input-group">
            <span className="input-group-text" style={{ backgroundColor: '#2F3E55', color: '#f4ecd8' }}>
              <i className="fa fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search treasures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
            ))}
          </select>
        </div>

        <div className="col-md-3 mb-3">
          <select className="form-select" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
            <option value="All">All Prices</option>
            <option value="0-1000">Under ₱1,000</option>
            <option value="1000-2000">₱1,000 - ₱2,000</option>
            <option value="2000-3000">₱2,000 - ₱3,000</option>
            <option value="3000-99999">Above ₱3,000</option>
          </select>
        </div>

        <div className="col-md-2 mb-3">
          <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <p className="text-muted mb-3">Showing {displayedProducts.length} of {filteredProducts.length} treasures</p>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          <i className="fa fa-compass fa-3x text-muted mb-3"></i>
          <h4>No treasures found</h4>
          <p className="text-muted">Try adjusting your search or filters</p>
          <button className="btn btn-primary" onClick={() => { setSearchTerm(""); setSelectedCategory("All"); setPriceRange("All"); setSortBy("default"); }}>
            Clear All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="row">
            {displayedProducts.map((product) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {/* Infinite Scroll Loader */}
          {displayedProducts.length < filteredProducts.length && (
            <div ref={loaderRef} className="text-center py-4">
              {skeletonLoading ? (
                <div className="row">
                  {[...Array(2)].map((_, i) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={i}>
                      <SkeletonCard />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">Scroll down to load more treasures...</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;