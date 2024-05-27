import Layout from "./../../components/Layout/Layout";
import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Properties</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p._id}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.place}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Place : {p.place}</h5>
                    <h5 className="card-title">Price : $ {p.price}</h5>
                    <h5 className="card-title">Area (in Sqft) : {p.area}</h5>
                    <h5 className="card-title">
                      Number of Bedrooms : {p.bedroom}
                    </h5>
                    <h5 className="card-title">
                      Number of Bathrooms : {p.bathroom}
                    </h5>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
