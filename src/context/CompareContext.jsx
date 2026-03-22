import { createContext, useState, useContext } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
    const [compareList, setCompareList] = useState([]);

    const addToCompare = (product) => {
        if (!isInCompare(product.id) && compareList.length < 3) {
            setCompareList([...compareList, product]);
        }
    };

    const removeFromCompare = (productId) => {
        setCompareList(compareList.filter(item => item.id !== productId));
    };

    const isInCompare = (productId) => {
        return compareList.some(item => item.id === productId);
    };

    const toggleCompare = (product) => {
        if (isInCompare(product.id)) {
            removeFromCompare(product.id);
        } else if (compareList.length < 3) {
            addToCompare(product);
        }
    };

    const clearCompare = () => {
        setCompareList([]);
    };

    return (
        <CompareContext.Provider value={{ 
            compareList, 
            addToCompare, 
            removeFromCompare, 
            isInCompare, 
            toggleCompare, 
            clearCompare,
            compareCount: compareList.length 
        }}>
            {children}
        </CompareContext.Provider>
    );
};

export const useCompare = () => {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error('useCompare must be used within CompareProvider');
    }
    return context;
};