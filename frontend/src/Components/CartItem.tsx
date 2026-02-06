import { Product } from "../types";

interface CartItemProps {
  product: Product;
  quantity: number;
}

export default function CartItem({ product, quantity }: CartItemProps) {
  const lineTotal = product.price * quantity;

  return (
    <tr>
      <td>{product.name}</td>
      <td>{quantity}</td>
      <td>
        {product.currency} {product.price.toFixed(2)}
      </td>
      <td>
        {product.currency} {lineTotal.toFixed(2)}
      </td>
    </tr>
  );
}
