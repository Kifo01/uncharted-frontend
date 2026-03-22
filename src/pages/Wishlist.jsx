import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();

    return (
        <div className="container fade-in py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>
                    <i className="fa fa-heart text-danger me-2"></i>
                    Your Wishlist
                </h2>
                <Link to="/products" className="btn btn-outline-primary">
                    <i className="fa fa-compass me-2"></i>
                    Browse Treasures
                </Link>
            </div>

            {wishlist.length === 0 ? (
                <div className="text-center py-5">
                    <i className="fa fa-heart-o fa-4x text-muted mb-3"></i>
                    <h4>Your wishlist is empty</h4>
                    <p className="text-muted">Start adding treasures you love!</p>
                    <Link to="/products" className="btn btn-primary">
                        Explore Collection
                    </Link>
                </div>
            ) : (
                <>
                    <p className="text-muted mb-3">
                        {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist
                    </p>
                    <div className="row">
                        {wishlist.map((product) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Wishlist;