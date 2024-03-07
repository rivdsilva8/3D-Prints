import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

export const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/allproducts");
    const data = await response.json();
    setAllProducts(data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (_id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: _id }),
    });
    await fetchInfo();
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}
  return (
    <div className="list-product">
      <h1>All Prints List</h1>
      <div className="card-container">
        {allProducts.map((product, index) => (
          <div key={index} className="card">
            <div className="card-content">
              <div className="image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-image"
                />
              </div>
              <div className="details">
              <img
              onClick={() => removeProduct(product._id)}
              className="remove-icon"
              src={cross_icon}
              alt="Remove"
            />
                <h2>{product.name}</h2>
                <p>Date Added: {formatDate(product.date)}</p>
                <p>Description: {product.description}</p>
                <p>
                  Dimensions: {product.dimensions.length} x{" "}
                  {product.dimensions.width} x {product.dimensions.height}
                </p>
                <p>Colors: {product.colors.join(", ")}</p>
                <p>Category: {product.category}</p>
                <p>Tags: {product.tags.join(", ")}</p>
                <p>Old Price: ${product.old_price}</p>
                <p>New Price: ${product.new_price}</p>
                <p>Available: {product.available ? "Yes" : "No"}</p>
              </div>
            </div>
          
          </div>
        ))}
      </div>
    </div>
  );
};

