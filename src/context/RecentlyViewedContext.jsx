import { createContext, useState, useEffect, useContext } from 'react';

const RecentlyViewedContext = createContext();

export const RecentlyViewedProvider = ({ children }) => {
    const [recentlyViewed, setRecentlyViewed] = useState(() => {
        const saved = localStorage.getItem('recentlyViewed');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);

    const addRecentlyViewed = (product) => {
        const filtered = recentlyViewed.filter(item => item.id !== product.id);
        setRecentlyViewed([product, ...filtered].slice(0, 5));
    };

    const clearRecentlyViewed = () => {
        setRecentlyViewed([]);
    };

    return (
        <RecentlyViewedContext.Provider value={{ 
            recentlyViewed, 
            addRecentlyViewed, 
            clearRecentlyViewed 
        }}>
            {children}
        </RecentlyViewedContext.Provider>
    );
};

export const useRecentlyViewed = () => {
    const context = useContext(RecentlyViewedContext);
    if (!context) {
        throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
    }
    return context;
};