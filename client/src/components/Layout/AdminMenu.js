import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div classname="text-centre">
        <div className="list-group">
          <h4>Seller Panel</h4>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Post your Property
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            See your Property
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
