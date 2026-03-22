import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="custom-header py-2">
            <div className="container py-1">
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <Link to="/" className="text-decoration-none">
                        <h1 className="h3 mb-0" style={{ color: '#f4ecd8', fontWeight: 'bold' }}>
                           Uncharted: Beyond The Map
                        </h1>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;