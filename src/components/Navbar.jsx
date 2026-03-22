import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import unchartedLogo from '../assets/images/uncharted_logo.png';

const Navbar = () => {
    const { cart } = useContext(CartContext);
    const { isDarkMode, toggleTheme } = useTheme();
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            {/* DESKTOP NAVBAR */}
            <nav className="navbar navbar-expand-lg d-none d-lg-block py-2">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <div style={{ 
                            backgroundColor: '#f4ecd8',
                            borderRadius: '50%',
                            padding: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: '9px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                        }}>
                            <img src={unchartedLogo} alt="Uncharted Treasures" style={{ height: '32px' }} />
                        </div>
                        <span style={{ 
                            color: '#d4c5b0', 
                            fontSize: '0.75rem', 
                            fontWeight: 'bold',
                            marginLeft: '0',
                            fontFamily: "'Cinzel', serif"
                        }}>
                            Sic Parvis Magna
                        </span>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/products">Treasures</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/policies">Policies</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span className="badge bg-danger ms-1">{cartCount}</span>
                                </Link>
                            </li>
                            <li className="nav-item ms-2">
                                <button className="theme-toggle" onClick={toggleTheme}>
                                    {isDarkMode ? <><i className="fa fa-sun me-1"></i> Light</> : <><i className="fa fa-moon me-1"></i> Dark</>}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

 {/* ================= MOBILE BOTTOM NAVIGATION ================= */}
<nav className="navbar fixed-bottom d-lg-none shadow-lg" 
     style={{ 
       backgroundColor: isDarkMode ? '#16213e' : '#ffffff',
       borderTop: '3px solid #c9a24d'
     }}>
    <div className="container-fluid d-flex justify-content-around text-center">
        
        <Link to="/" className="text-decoration-none d-flex flex-column align-items-center">
            <i className="fa fa-home fs-5" style={{ color: isDarkMode ? '#f4ecd8' : '#2F3E55' }}></i>
            <span style={{ fontSize: '11px', color: isDarkMode ? '#d4c5b0' : '#2F3E55', fontWeight: '500' }}>Home</span>
        </Link>

        <Link to="/products" className="text-decoration-none d-flex flex-column align-items-center">
            <i className="fa fa-compass fs-5" style={{ color: isDarkMode ? '#f4ecd8' : '#2F3E55' }}></i>
            <span style={{ fontSize: '11px', color: isDarkMode ? '#d4c5b0' : '#2F3E55', fontWeight: '500' }}>Treasures</span>
        </Link>

        <Link to="/wishlist" className="text-decoration-none d-flex flex-column align-items-center">
            <i className="fa fa-heart fs-5" style={{ color: isDarkMode ? '#f4ecd8' : '#2F3E55' }}></i>
            <span style={{ fontSize: '11px', color: isDarkMode ? '#d4c5b0' : '#2F3E55', fontWeight: '500' }}>Wishlist</span>
        </Link>

        <Link to="/cart" className="text-decoration-none d-flex flex-column align-items-center position-relative">
            <i className="fa fa-shopping-cart fs-5" style={{ color: isDarkMode ? '#f4ecd8' : '#2F3E55' }}></i>
            {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                    {cartCount}
                </span>
            )}
            <span style={{ fontSize: '11px', color: isDarkMode ? '#d4c5b0' : '#2F3E55', fontWeight: '500' }}>Cart</span>
        </Link>

        {/* Theme Toggle */}
        <button 
            className="btn border-0 d-flex flex-column align-items-center"
            onClick={toggleTheme}
            style={{ backgroundColor: 'transparent' }}
        >
            <i className={`fs-5 ${isDarkMode ? 'fa fa-sun' : 'fa fa-moon'}`} 
               style={{ color: isDarkMode ? '#f4ecd8' : '#2F3E55' }}></i>
            <span style={{ fontSize: '11px', color: isDarkMode ? '#d4c5b0' : '#2F3E55', fontWeight: '500' }}>
                {isDarkMode ? 'Light' : 'Dark'}
            </span>
        </button>

    </div>
</nav>
        </>
    );
};

export default Navbar;