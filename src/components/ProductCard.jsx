import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';  
import { useCompare } from '../context/CompareContext'; 

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { isInCompare, toggleCompare } = useCompare();    



    return (
        <div className="card treasure-card h-100">
            
            {/* Wishlist Heart Icon */}
            <button
                className="btn wishlist-btn"
                onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 10,
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '35px',
                    height: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
                title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
                <i 
                    className={`fa ${isInWishlist(product.id) ? 'fa-heart text-danger' : 'fa-heart-o text-muted'}`}
                    style={{ fontSize: '1.1rem' }}
                ></i>
            </button>

            {/* Compare Scale Icon */}
            <button
                className="btn compare-btn"
                onClick={(e) => { e.stopPropagation(); toggleCompare(product); }}
                style={{
                    position: 'absolute',
                    top: '55px',
                    right: '10px',
                    zIndex: 10,
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '35px',
                    height: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
                title={isInCompare(product.id) ? 'Remove from Compare' : 'Add to Compare'}
            >
                <i 
                    className={`fa fa-balance-scale ${isInCompare(product.id) ? 'text-primary' : 'text-muted'}`}
                    style={{ fontSize: '1rem' }}
                ></i>
            </button>

            {/* Treasure Seal Badge */}
            {product.discount && (
                <span className="treasure-seal">
                    <i className="fa fa-compass"></i> -{product.discount}%
                </span>
            )}
            
            <div className="product-img-wrapper">
                <img 
                    src={product.image} 
                    className="card-img-top" 
                    alt={product.name} 
                />
            </div>
            
            <div className="card-body">
                <h5 className="card-title treasure-title">{product.name}</h5>
                
                <p className="card-text text-muted small mb-2" style={{ fontSize: '0.85rem', minHeight: '40px' }}>
                    {product.description}
                </p>
                
                <div className="treasure-rating mb-2">
                    {[...Array(5)].map((_, i) => (
                        <i 
                            key={i} 
                            className={`fa fa-star ${i < product.rating ? 'text-warning' : 'text-muted'}`}
                        ></i>
                    ))}
                </div>
                
                <div className="treasure-price mb-3">
                    {product.oldPrice && (
                        <span className="text-muted text-decoration-line-through me-2">
                            ₱{product.oldPrice.toFixed(2)}
                        </span>
                    )}
                    <span className="text-danger fw-bold">₱{product.price.toFixed(2)}</span>
                </div>
                
                <button 
                    className="btn btn-explore w-100" 
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                >
                    <i className="fa fa-compass me-2"></i>
                    Add to Exploration
                </button>
            </div>
        </div>
    );
};

export default ProductCard;