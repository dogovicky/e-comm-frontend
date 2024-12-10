import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { title } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const url = `http://localhost:8080/api/product/${title}`;
      try {
        const response = await axios.get(url);
        setProduct(response.data);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchProduct();
  }, [title]);

  return (
    <>
      <div>
        {product && (
          <div>
            <div className="img_box">
              <img src={product.image_url} alt={product.title} />
            </div>
            <div className="body">
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <h4>${product.price}</h4>
              <h4>{product.quantity}</h4>
            </div>
            <div className="btn_box">
              <button className="btn btn-dark m-2">Add To Cart</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
