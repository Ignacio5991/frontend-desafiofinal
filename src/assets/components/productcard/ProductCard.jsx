import styles from './product-card.module.css';
const ProductCard = ({ product, setCurrentProduct }) => {
  return (
    <>
      <div className={styles.productCard} onClick={() => setCurrentProduct(product.id)}>
        <p>{product.title}</p>
        <p>{product.price}</p>
      </div>
    </>
  );
};

export default ProductCard;
