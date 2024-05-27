import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate } from "react-router-dom";

const { option } = Select

const CreateProduct = () => {
  const navigate = useNavigate();
  const [place, setPlace] = useState("")
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [hospital, setHospital] = useState("");
  const [school, setSchool] = useState("");
  const [photo, setPhoto] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("place", place);
      productData.append("price", price);
      productData.append("area", area);
      productData.append("bedroom", bedroom);
      productData.append("bathroom", bathroom);
      productData.append("hospital", hospital);
      productData.append("school", school);
      productData.append("photo", photo);
  
      const { data } = axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard: Sell"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create New Property</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-centre">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={place}
                  placeholder="write about place"
                  className="form-control"
                  onChange={(e) => setPlace(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={area}
                  placeholder="Area"
                  className="form-control"
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={bedroom}
                  placeholder="Number of bedrooms"
                  className="form-control"
                  onChange={(e) => setBedroom(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={bathroom}
                  placeholder="Number of bathrooms"
                  className="form-control"
                  onChange={(e) => setBathroom(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={hospital}
                  placeholder="Number of hospitals"
                  className="form-control"
                  onChange={(e) => setHospital(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={school}
                  placeholder="Number of schools"
                  className="form-control"
                  onChange={(e) => setSchool(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PROPERTY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct
