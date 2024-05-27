import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();

  const [product, setProduct] = useState({});

  //initalp details
  useEffect(() => {
    if (params?._id) getProduct();
  }, [params?._id]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params._id}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.place}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Property Details</h1>
          <hr />
          <h6>Place : {product.place}</h6>

          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Area (in sqft) : {product.area}</h6>
          <h6>Number of Bedrooms : {product.bedroom}</h6>
          <h6>Number of Bathrooms : {product.bathroom}</h6>
          <h6>Number of hospitals : {product.hospital}</h6>
          <h6>Number of schools : {product.school}</h6>
        </div>
      </div>
      <hr />
    </Layout>
  );
};

export default ProductDetails;
