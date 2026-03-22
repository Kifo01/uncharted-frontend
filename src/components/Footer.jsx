import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';

const Footer = () => {
    const { wishlistCount } = useWishlist();
    const { compareCount } = useCompare();

    return (
        <footer className="border-top mt-5 py-4" style={{ backgroundColor: '#3b2f2f' }}>
            <div className="container">
                <div className="row">
                    {/* Store Info */}
                    <div className="col-md-4 mb-3">
                        <h5 style={{ color: '#c9a24d', fontWeight: 'bold' }}>Uncharted Treasures</h5>
                        <p className="small" style={{ color: '#d4c5b0' }}>
                            Your trusted source for adventure gear and treasure replicas. 
                            Fortune and glory await!
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4 mb-3">
                        <h5 style={{ color: '#c9a24d', fontWeight: 'bold' }}>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-decoration-none" style={{ color: '#d4c5b0' }}>Home</Link></li>
                            <li><Link to="/products" className="text-decoration-none" style={{ color: '#d4c5b0' }}>Treasures</Link></li>
                            <li><Link to="/about" className="text-decoration-none" style={{ color: '#d4c5b0' }}>About</Link></li>
                            <li><Link to="/policies" className="text-decoration-none" style={{ color: '#d4c5b0' }}>Policies</Link></li>
                            <li><Link to="/contact" className="text-decoration-none" style={{ color: '#d4c5b0' }}>Contact</Link></li>
                            <li><Link to="/wishlist" className="text-decoration-none" style={{ color: '#d4c5b0' }}>
                                <i className="fa fa-heart me-1"></i> Wishlist ({wishlistCount})
                            </Link></li>
                            <li><Link to="/compare" className="text-decoration-none" style={{ color: '#d4c5b0' }}>
                                <i className="fa fa-balance-scale me-1"></i> Compare ({compareCount})
                            </Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-md-4 mb-3">
                        <h5 style={{ color: '#c9a24d', fontWeight: 'bold' }}>Contact</h5>
                        <p className="small" style={{ color: '#d4c5b0' }}>
                            <i className="fa fa-envelope me-2"></i>
                            explorer@unchartedtreasures.com
                        </p>
                        <p className="small" style={{ color: '#d4c5b0' }}>
                            <i className="fa fa-phone me-2"></i>
                            +63 912 345 6789
                        </p>
                        <div className="mt-3">
                            <a href="#" className="me-3" style={{ color: '#c9a24d' }}>
                                <i className="fa fa-facebook"></i>
                            </a>
                            <a href="#" className="me-3" style={{ color: '#c9a24d' }}>
                                <i className="fa fa-twitter"></i>
                            </a>
                            <a href="#" style={{ color: '#c9a24d' }}>
                                <i className="fa fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="my-4" style={{ borderColor: '#c9a24d', opacity: 0.5 }} />

                <div className="text-center small" style={{ color: '#d4c5b0' }}>
                    <p className="mb-0">&copy; 2026 Uncharted: Beyond The Map. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;