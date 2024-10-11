import React from 'react';
import styles from './ProductCard.module.css';
import { renderStars } from '../utils/renderStars';

const ProductCard = ({ product }) => {
    const hasDiscount = product.discountedPrice < product.price;
    const discountPercentage = hasDiscount
        ? ((product.price - product.discountedPrice) / product.price) * 100
        : 0;

    return (
        <div className={styles.productCard}>
            {hasDiscount && (
                <div className={styles.discountBadge}>
                    -{discountPercentage.toFixed(0)}%
                </div>
            )}
            <img src={product.image.url} alt={product.title} className={styles.productImage} />
            <h3 className={styles.productTitle}>{product.title}</h3>

            <div className={styles.productRating}>{renderStars(product.rating)}</div>

            <p className={styles.productDescription}>{product.description}</p>

            <div className={styles.priceContainer}>
                <p className={styles.productPrice}>${product.discountedPrice.toFixed(2)}</p>
                {hasDiscount && (
                    <p className={styles.originalPrice}>${product.price.toFixed(2)}</p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
