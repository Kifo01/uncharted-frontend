import { useState, useEffect } from 'react';

const Sidebar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    return (
        <aside className="bg-light p-3">
            <h5>Categories</h5>
            <ul className="list-group">
                {categories.map((category, index) => (
                    <li key={index} className="list-group-item">
                        {category}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;