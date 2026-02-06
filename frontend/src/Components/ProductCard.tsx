import { Link } from "react-router-dom";
import { Product } from "../types";
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <h2>
        <Link
          to={`/products/${product.id}`}
        >
          {product.name}
        </Link>
      </h2>
      <p>
        Price: {product.currency} {product.price.toFixed(2)}
      </p>
      <Link to={`/products/${product.id}`}>View Details</Link>
    </div>
  );
}
