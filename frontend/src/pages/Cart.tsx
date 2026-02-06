import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, clearCart } from '../store/cartSlice';
import { useGetProductsQuery } from '../store/services/productsApi';
import { useCreateOrderMutation } from '../store/services/ordersApi';
import CartItem from '../Components/CartItem';
import ErrorDisplay from '../Components/ErrorDisplay'; // Import ErrorDisplay
import './Cart.css';

export default function Cart() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    try {
      await createOrder({
        customerEmail: 'guest@example.com',
        items: cartItems,
      }).unwrap();
      dispatch(clearCart());
      setOrderPlaced(true);
    } catch (err) {
      console.error('Failed to place order:', err);
      alert('Failed to place order. Please try again.');
    }
  };

  if (orderPlaced) {
    return (
      <div>
        <h1>Thank you for your order!</h1>
        <p>Your order has been placed successfully.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Cart</h1>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Cart</h1>
        <ErrorDisplay error={error} message="Error loading cart." />
      </div>
    );
  }

  if (!products) {
    return (
      <div>
        <h1>Cart</h1>
        <p>No products found.</p>
      </div>
    );
  }

  const cartProductItems = cartItems.map(cartItem => {
    const product = products.find(p => p.id === cartItem.productId);
    return { ...cartItem, product };
  }).filter(item => item.product);

  const total = cartProductItems.reduce((acc, item) => {
    return acc + (item.product!.price * item.quantity);
  }, 0);

  return (
    <div>
      <h1>Cart</h1>
      {cartProductItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Line Total</th>
              </tr>
            </thead>
            <tbody>
              {cartProductItems.map(item => (
                <CartItem key={item.productId} product={item.product!} quantity={item.quantity} />
              ))}
            </tbody>
            <tfoot>
              <tr className="cart-total-row">
                <th colSpan={3}>Total</th>
                <th>{products[0]?.currency || ''} {total.toFixed(2)}</th>
              </tr>
            </tfoot>
          </table>
          <button onClick={handleCheckout} disabled={isCreatingOrder || cartProductItems.length === 0} className="checkout-button">
            {isCreatingOrder ? 'Placing Order...' : 'Checkout'}
          </button>
        </>
      )}
    </div>
  );
}
