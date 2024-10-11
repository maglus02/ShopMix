import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { fetchProductById } from '../api';
import styles from './ProductPage.module.css';
import { renderStars } from '../utils/renderStars';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner}></div></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const discount = product.price - product.discountedPrice;

  return (
    <div className={styles.productContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.productImage} src={product.image.url} alt={product.title} />
      </div>
      <div className={styles.detailsContainer}>
        <h1 className={styles.productTitle}>{product.title}</h1>
        <div className={styles.ratingContainer}>
          <span className={styles.overallRating}>{renderStars(product.rating)}</span>
        </div>
        <p className={styles.productDescription}>{product.description}</p>
        <div className={styles.priceContainer}>
          <p className={styles.productPrice}>${product.discountedPrice.toFixed(2)}</p>
          {discount > 0 && (
            <span className={styles.originalPrice}>
              (Discounted from ${product.price.toFixed(2)}, Save ${discount.toFixed(2)})
            </span>
          )}
        </div>
        <button className={styles.addToCartButton} onClick={() => addToCart(product)}>
          Add to Cart
        </button>
        <h3 className={styles.reviewsTitle}>Reviews</h3>
        <div className={styles.reviewsContainer}>
          {product.reviews.length ? (
            product.reviews.map((review) => (
              <div key={review.id} className={styles.reviewItem}>
                <p className={styles.reviewRating}>{renderStars(review.rating)}</p>
                <strong>{review.username}</strong>
                <p className={styles.reviewText}> {review.description}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
