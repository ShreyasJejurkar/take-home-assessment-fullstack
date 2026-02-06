import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductByIdQuery } from '../store/services/productsApi';
import { addItem } from '../store/cartSlice';
import ErrorDisplay from '../Components/ErrorDisplay'; // Import ErrorDisplay
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id || '');

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem({ productId: product.id, quantity: 1 }));
      alert(`${product.name} has been added to your cart.`);
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1>Product Detail</h1>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    // Check for 404 specifically
    if ('status' in error && error.status === 404) {
      return (
        <div>
          <h1>Product Not Found</h1>
          <ErrorDisplay error={error} message="The product you are looking for does not exist." />
        </div>
      );
    }
    return (
      <div>
        <h1>Product Detail</h1>
        <ErrorDisplay error={error} message="Error loading product details." />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <div className="product-detail-container">
        <div className="product-detail-info">
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> {product.currency} {product.price.toFixed(2)}</p>
          <p><strong>Availability:</strong> {product.inStock ? 'In Stock' : 'Out of Stock'}</p>
          <p><strong>Category ID:</strong> {product.categoryId}</p>
          {product.tags && product.tags.length > 0 && (
            <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
          )}
          <button onClick={handleAddToCart} disabled={!product.inStock} className="add-to-cart-button">
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
