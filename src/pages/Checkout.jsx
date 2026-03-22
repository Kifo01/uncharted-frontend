import { useContext, useState, useRef } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [finalTotal, setFinalTotal] = useState(0);
    const [orderNumber, setOrderNumber] = useState('');
    const [savedCartItems, setSavedCartItems] = useState([]);  // ← ADDED
    const receiptRef = useRef(null);
    
    // Form state
    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        payment: 'cod'
    });

    // Compute totals
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.12;
    const total = subtotal + tax;

    // Generate order number
    const generateOrderNumber = () => {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `ORD-${timestamp}-${random}`;
    };

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const numericValue = value.replace(/[^0-9]/g, '');
            setForm({ ...form, [name]: numericValue });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // Print receipt
    const handlePrint = () => {
        window.print();
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.address || !form.phone) {
            alert("Please complete all fields");
            return;
        }

        if (form.phone.length < 10) {
            alert("Phone number must be at least 10 digits");
            return;
        }

        const ordNum = generateOrderNumber();
        
        // ✅ SAVE CART ITEMS BEFORE CLEARING
        setSavedCartItems([...cart]);
        
        setOrderNumber(ordNum);
        setFinalTotal(total);
        clearCart();  // Now clear cart AFTER saving
        setSubmitted(true);
    };

    // Get current date/time
    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toLocaleString('en-PH', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    // Show success page with receipt
  // Show success page with receipt
if (submitted) {
    // Calculate totals from savedCartItems (not cart)
    const savedSubtotal = savedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const savedTax = savedSubtotal * 0.12;

    return (
        <div className="container fade-in py-5">
            {/* Print Button (Hidden when printing) */}
            <div className="text-center mb-4 no-print">
                <button onClick={handlePrint} className="btn btn-primary me-2">
                    <i className="fa fa-print me-2"></i>Print Receipt
                </button>
                <Link to="/products" className="btn btn-outline-secondary">
                    <i className="fa fa-shopping-bag me-2"></i>Continue Shopping
                </Link>
            </div>

            {/* Receipt */}
            <div ref={receiptRef} className="receipt-container">
                <div className="receipt">
                    {/* Header */}
                    <div className="receipt-header text-center mb-4">
                        <h2 className="mb-1" style={{ fontFamily: "'Cinzel', serif", color: '#3b2f2f' }}>
                            Uncharted Treasures
                        </h2>
                        <p className="text-muted mb-1">Fortune and Glory Await</p>
                        <p className="text-muted mb-3">Sic Parvis Magna</p>
                        <hr style={{ borderTop: '2px solid #c9a24d' }} />
                    </div>

                    {/* Receipt Info */}
                    <div className="receipt-info mb-4">
                        <div className="row">
                            <div className="col-md-6">
                                <h5 className="mb-2">Official Receipt</h5>
                                <p className="mb-1"><strong>Order #:</strong> {orderNumber}</p>
                                <p className="mb-1"><strong>Date:</strong> {getCurrentDateTime()}</p>
                                <p className="mb-0"><strong>Payment:</strong> {form.payment.toUpperCase()}</p>
                            </div>
                            <div className="col-md-6 text-md-end">
                                <h5 className="mb-2">Customer Details</h5>
                                <p className="mb-1"><strong>{form.name}</strong></p>
                                <p className="mb-1">{form.email}</p>
                                <p className="mb-0">{form.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="receipt-items mb-4">
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>Item</th>
                                    <th className="text-center">Qty</th>
                                    <th className="text-end">Price</th>
                                    <th className="text-end">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {savedCartItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td className="text-center">{item.quantity}</td>
                                        <td className="text-end">₱{item.price.toFixed(2)}</td>
                                        <td className="text-end">₱{(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals - FIXED: Use savedSubtotal and savedTax */}
                    <div className="receipt-totals mb-4">
                        <div className="row justify-content-end">
                            <div className="col-md-6">
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal:</span>
                                    <span>₱{savedSubtotal.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>VAT (12%):</span>
                                    <span>₱{savedTax.toFixed(2)}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-2">
                                    <h5 className="mb-0">TOTAL:</h5>
                                    <h5 className="mb-0 text-danger">₱{(savedSubtotal + savedTax).toFixed(2)}</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="receipt-footer text-center mt-5">
                        <hr style={{ borderTop: '2px solid #c9a24d' }} />
                        <p className="mb-2">Thank you for your purchase!</p>
                        <p className="text-muted small mb-0">
                            Uncharted: Beyond The Map<br />
                            explorer@unchartedtreasures.com | +63 912 345 6789
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

    // Check if cart is empty
    if (cart.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2>Your cart is empty</h2>
                <p>Add some products before checkout.</p>
                <Link to="/products" className="btn btn-primary mt-3">
                    Go to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Checkout</h2>

            <div className="row">
                {/* Checkout Form */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="mb-3">Customer Information</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Address *</label>
                                    <textarea
                                        name="address"
                                        className="form-control"
                                        rows="3"
                                        value={form.address}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-control"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder=""
                                        maxLength={11}
                                        required
                                    />
                                    <small className="text-muted">Numbers only (10-11 digits)</small>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Payment Method *</label>
                                    <select
                                        name="payment"
                                        className="form-control"
                                        value={form.payment}
                                        onChange={handleChange}
                                    >
                                        <option value="cod">Cash on Delivery</option>
                                        <option value="gcash">GCash</option>
                                        <option value="card">Credit/Debit Card</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-success w-100">
                                    Place Order
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="mb-3">Order Summary</h4>
                            
                            {cart.map((item) => (
                                <div key={item.id} className="d-flex justify-content-between mb-2">
                                    <span>
                                        {item.name} × {item.quantity}
                                    </span>
                                    <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}

                            <hr />
                            
                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal:</span>
                                <span>₱{subtotal.toFixed(2)}</span>
                            </div>
                            
                            <div className="d-flex justify-content-between mb-2">
                                <span>Tax (12%):</span>
                                <span>₱{tax.toFixed(2)}</span>
                            </div>
                            
                            <hr />
                            
                            <div className="d-flex justify-content-between mb-3">
                                <h5>Total:</h5>
                                <h5 className="text-danger">₱{total.toFixed(2)}</h5>
                            </div>

                            <div className="alert alert-info">
                                <small>
                                    <i className="fas fa-info-circle"></i> Upon placing your order, your cart will be cleared and a confirmation will be shown.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Link to="/cart" className="btn btn-outline-primary mt-3">
                ← Back to Cart
            </Link>
        </div>
    );
};

export default Checkout;