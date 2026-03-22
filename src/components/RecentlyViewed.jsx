import { Link } from 'react-router-dom';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import ProductCard from './ProductCard';

const RecentlyViewed = () => {
    const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

    if (recentlyViewed.length === 0) return null;

    return (
        <div className="container fade-in py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>
                    <i className="fa fa-history me-2"></i>
                    Recently Viewed
                </h2>
                <button className="btn btn-outline-secondary btn-sm" onClick={clearRecentlyViewed}>
                    Clear History
                </button>
            </div>
            <div className="row">
                {recentlyViewed.map((product) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewed;