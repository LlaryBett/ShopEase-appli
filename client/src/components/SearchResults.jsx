import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard"; // Assuming you're reusing ProductCard component

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios
        .get(`/api/products/search?q=${query}`) // Ensure you have this route in the backend
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Something went wrong while fetching products.");
          setLoading(false);
        });
    }
  }, [query]);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="px-4 py-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="text-lg text-gray-500">No products found.</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
