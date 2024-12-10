import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { state, dispatch } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const url = "http://localhost:8080/api/products";

    try {
      const getProducts = async () => {
        const response = await axios.get(url);
        console.log(response.data);
        setProducts(response.data);
      };
      getProducts();
    } catch (error) {
      setError("Failed to load products");
      console.log(error.message);
    }
  }, []);

  // const filterProducts = (keyword) => {
  //   useEffect(() => {
  //     const filterProductsByCategory = async (category) => {
  //       const url = "http://localhost:8080/api/filter";

  //       const response = await axios.get(url);
  //       setProducts(response.data);
  //     };
  //   }, []);

  //   filterProductsByCategory(keyword);
  // };

  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
    alert("Product added successfully");
  };

  return (
    <>
      <div className="home">
        <div className="products row">
          {products
            ? products.map((product) => (
                <div className="col" key={product.product_id}>
                  <div className="img_box">
                    <img src={product.image_url} alt={product.title} />
                  </div>
                  <Link to={`/product/${product.title}`}>
                    <div className="details_box">
                      <h4>{product.title}</h4>
                      <i>{product.category}</i>
                      <h4>${product.price}.00</h4>
                    </div>
                  </Link>
                  <div className="btn_box">
                    <button
                      className="btn btn-dark m-3"
                      onClick={() => addToCart(product)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))
            : error && (
                <h4>
                  Failed to load products! Please check internet connection or
                  try again later
                </h4>
              )}
        </div>
      </div>
    </>
  );
};

export default Home;
