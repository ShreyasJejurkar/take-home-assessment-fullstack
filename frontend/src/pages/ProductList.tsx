import { useState, useMemo } from "react";
import { useGetProductsQuery } from "../store/services/productsApi";
import { useGetCategoriesQuery } from "../store/services/categoriesApi";
import ProductCard from "../Components/ProductCard";
import ErrorDisplay from "../Components/ErrorDisplay"; // Import ErrorDisplay
import { Product } from "../types";
import './ProductList.css';

export default function ProductList() {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useGetCategoriesQuery();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts: Product[] = products ? [...products] : [];

    if (selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.categoryId === selectedCategory,
      );
    }

    if (sortOrder !== "none") {
      filteredProducts.sort((a, b) => {
        if (sortOrder === "price-asc") {
          return a.price - b.price;
        } else if (sortOrder === "price-desc") {
          return b.price - a.price;
        } else if (sortOrder === "name-asc") {
          return a.name.localeCompare(b.name);
        } else if (sortOrder === "name-desc") {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
    }

    return filteredProducts;
  }, [products, selectedCategory, sortOrder]);

  if (isLoading || isLoadingCategories) {
    return (
      <div>
        <h1>Products</h1>
        <p>Loading products and categories...</p>
      </div>
    );
  }

  if (error || errorCategories) {
    return (
      <div>
        <h1>Products</h1>
        <ErrorDisplay error={error || errorCategories} message="Error loading products." />
      </div>
    );
  }

  return (
    <div>
      <h1>Products</h1>
      <div className="product-filters">
        <div>
          <label htmlFor="category-filter">Category: </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort-order">Sort By: </label>
          <select id="sort-order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="none">None</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>
      </div>
      <div className="product-grid">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
