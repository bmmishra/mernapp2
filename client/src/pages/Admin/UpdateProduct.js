import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
//import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
//const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [hospital, setHospital] = useState("");
  const [school, setSchool] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params._id}`
      );
      setPlace(data.product.place);
      setId(data.product._id);
      setPrice(data.product.price);
      setArea(data.product.area);
      setBedroom(data.product.bedroom);
      setBathroom(data.product.bathroom);
      setHospital(data.product.hospital);
      setSchool(data.product.school);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  

  //create product function
  const handleUpdate = async (e) => {
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
      photo && productData.append("photo", photo);
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
            <h1>Update Property</h1>
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
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
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
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PROPERTY
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PROPERTY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
