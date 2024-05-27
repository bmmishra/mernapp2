import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { Radio } from "antd";
import { Prices } from "../components/Prices";
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css";
import { Area } from "../components/Area";

function HomePage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [radio, setRadio] = useState([]);
  const [bedroom, setBedroom] = useState("");
  const [area, setArea] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!radio.length && !bedroom) getAllProducts();
  }, [radio.length, bedroom]);

  useEffect(() => {
    if (radio.length || bedroom) filterProduct();
  }, [radio, bedroom]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        radio,
        bedroom,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (id) => {
    try {
      const { data } = await axios.post(`/api/v1/product/like/${id}`);
      const updatedProducts = products.map((product) =>
        product._id === id ? { ...product, likes: data.likes } : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Rooms for Rent - Best Offers"}>
      <div className="row">
        <div className="col-md-3">
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <h4 className="text-center mt-4">Filter By Bedroom</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setBedroom(e.target.value)}>
              <Radio value="1">1 Bedroom</Radio>
              <Radio value="2">2 Bedrooms</Radio>
              <Radio value="3">3 Bedrooms</Radio>
              <Radio value="4">4 Bedrooms</Radio>
            </Radio.Group>
          </div>

          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">Houses for rent</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
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
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p._id}`)}
                  >
                    More Details
                  </button>

                  <button
                    className="btn btn-outline-primary ms-1"
                    onClick={() => handleLike(p._id)}
                  >
                    Like ({p.likes || 0})
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
