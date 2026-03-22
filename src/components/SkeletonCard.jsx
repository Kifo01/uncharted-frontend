const SkeletonCard = () => {
  return (
    <div className="card treasure-card h-100">
      <div className="product-img-wrapper" style={{ height: '300px', backgroundColor: '#e0e0e0' }}>
        <div className="skeleton-image" style={{ 
          width: '100%', 
          height: '100%',
          background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
          backgroundSize: '200% 100%',
          animation: 'skeleton-loading 1.5s infinite'
        }}></div>
      </div>
      <div className="card-body">
        <div className="skeleton-text" style={{ 
          height: '20px', 
          width: '80%', 
          backgroundColor: '#e0e0e0',
          marginBottom: '10px',
          borderRadius: '4px',
          animation: 'skeleton-loading 1.5s infinite'
        }}></div>
        <div className="skeleton-text" style={{ 
          height: '15px', 
          width: '60%', 
          backgroundColor: '#e0e0e0',
          marginBottom: '10px',
          borderRadius: '4px',
          animation: 'skeleton-loading 1.5s infinite'
        }}></div>
        <div className="skeleton-text" style={{ 
          height: '25px', 
          width: '40%', 
          backgroundColor: '#e0e0e0',
          marginBottom: '15px',
          borderRadius: '4px',
          animation: 'skeleton-loading 1.5s infinite'
        }}></div>
        <div className="skeleton-button" style={{ 
          height: '40px', 
          width: '100%', 
          backgroundColor: '#e0e0e0',
          borderRadius: '8px',
          animation: 'skeleton-loading 1.5s infinite'
        }}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;