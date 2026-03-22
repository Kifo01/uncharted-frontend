import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';

const Compare = () => {
    const { compareList, removeFromCompare, clearCompare } = useCompare();

    return (
        <div className="container fade-in py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>
                    <i className="fa fa-balance-scale me-2"></i>
                    Compare Treasures
                </h2>
                {compareList.length > 0 && (
                    <button className="btn btn-outline-danger" onClick={clearCompare}>
                        Clear All
                    </button>
                )}
            </div>

            {compareList.length === 0 ? (
                <div className="text-center py-5">
                    <i className="fa fa-balance-scale fa-4x text-muted mb-3"></i>
                    <h4>No products to compare</h4>
                    <p className="text-muted">Add up to 3 products to compare</p>
                    <Link to="/products" className="btn btn-primary">Browse Treasures</Link>
                </div>
            ) : (
                <>
                    <p className="text-muted mb-3">{compareList.length} of 3 products selected</p>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th style={{ width: '150px' }}>Feature</th>
                                    {compareList.map(product => (
                                        <th key={product.id} style={{ width: '250px' }}>
                                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                                            <button className="btn btn-sm btn-danger mt-2" onClick={() => removeFromCompare(product.id)}>
                                                <i className="fa fa-times"></i> Remove
                                            </button>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Name</strong></td>
                                    {compareList.map(product => (
                                        <td key={product.id}>{product.name}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td><strong>Category</strong></td>
                                    {compareList.map(product => (
                                        <td key={product.id}>{product.category}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td><strong>Price</strong></td>
                                    {compareList.map(product => (
                                        <td key={product.id} className="text-danger fw-bold">₱{product.price.toFixed(2)}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td><strong>Rating</strong></td>
                                    {compareList.map(product => (
                                        <td key={product.id}>
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} className={`fa fa-star ${i < product.rating ? 'text-warning' : 'text-muted'}`}></i>
                                            ))}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td><strong>Description</strong></td>
                                    {compareList.map(product => (
                                        <td key={product.id} className="small">{product.description}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default Compare;