import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api';
import ProductCard from '../components/ProductCard';
import styles from './HomePage.module.css';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const getProducts = async () => {
        setLoading(true); // Start loading
        try {
            const data = await fetchProducts();
            setProducts(data.data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    if (loading) {
        return <div className={styles.loading}><div className={styles.spinner}></div></div>;
    }

    if (error) {
        return (
            <div className={styles.error}>
                Error: {error}
                <button onClick={getProducts}>Retry</button>
            </div>
        );
    }

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.homeContainer}>
            <h1 className={styles.title}>Welcome to ShopMix!</h1>
            <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
            />
            <h2 className={styles.productsTitle}>Products</h2>
            {filteredProducts.length === 0 ? (
                <div className={styles.noProducts}>No products found.</div>
            ) : (
                <ul className={styles.productList}>
                    {filteredProducts.map((product) => (
                        <li key={product.id} className={styles.productItem}>
                            <Link to={`/product/${product.id}`}>
                                <ProductCard product={product} />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HomePage;
