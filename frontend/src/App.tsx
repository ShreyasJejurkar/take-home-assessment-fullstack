import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from 'react-redux'; // Import useSelector
import { selectCartItems } from './store/cartSlice'; // Import selectCartItems
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import "./App.css"; // Import the new CSS file

export default function App() {
  const cartItems = useSelector(selectCartItems);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="app-header">
        <Link to="/" className="app-logo">
          DecryptCode Shop
        </Link>
        <nav className="app-nav">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart {totalItems > 0 && `(${totalItems})`}</Link>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </>
  );
}
