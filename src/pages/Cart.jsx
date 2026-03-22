import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.12;
    const total = subtotal + tax;

    if (cart.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2>Your cart is empty</h2>
                <Link to="/products" className="btn btn-primary mt-3">
                    Go Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Shopping Cart</h2>

            <div className="row">
                {/* Cart Items */}
                <div className="col-lg-8">
                    {cart.map((item) => (
                        <div key={item.id} className="card mb-3">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    {/* Image */}
                                    <div className="col-3 col-md-2">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="img-fluid rounded"
                                            style={{ height: '80px', objectFit: 'contain' }}
                                        />
                                    </div>

                                    {/* Name */}
                                    <div className="col-5 col-md-4">
                                        <h6 className="mb-1">{item.name}</h6>
                                        <small className="text-muted">₱{item.price.toFixed(2)}</small>
                                    </div>

                                    {/* Quantity */}
                                    <div className="col-4 col-md-2 text-center">
                                        <div className="btn-group btn-group-sm">
                                            <button 
                                                className="btn btn-outline-secondary"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="btn btn-outline-secondary disabled">
                                                {item.quantity}
                                            </span>
                                            <button 
                                                className="btn btn-outline-secondary"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Total Price */}
                                    <div className="col-6 col-md-2 text-end mt-2 mt-md-0">
                                        <strong>₱{(item.price * item.quantity).toFixed(2)}</strong>
                                    </div>

                                    {/* Remove - Full Width on Mobile */}
                                    <div className="col-12 col-md-2 text-end mt-2 mt-md-0">
                                        <button 
                                            className="btn btn-danger btn-sm w-100"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <i className="fa fa-trash"></i>
                                            <span className="d-none d-sm-inline"> Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button 
                        className="btn btn-outline-danger mb-4"
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>
                </div>

                {/* Order Summary */}
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="mb-3">Order Summary</h5>
                            
                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal:</span>
                                <span>₱{subtotal.toFixed(2)}</span>
                            </div>
                            
                            <div className="d-flex justify-content-between mb-2">
                                <span>Tax (12%):</span>
                                <span>₱{tax.toFixed(2)}</span>
                            </div>
                            
                            <div className="d-flex justify-content-between mb-2">
                                <span>Shipping:</span>
                                <span className="text-success">FREE</span>
                            </div>
                            
                            <hr />
                            
                            <div className="d-flex justify-content-between mb-3">
                                <h5>Total:</h5>
                                <h5 className="text-danger">₱{total.toFixed(2)}</h5>
                            </div>

                            <Link to="/checkout" className="btn btn-success w-100">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;