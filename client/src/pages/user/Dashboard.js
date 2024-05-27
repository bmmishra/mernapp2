import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth';

function Dashboard() {
  const [auth] = useAuth();
  const firstName = auth?.user?.firstname || '';
  const lastName = auth?.user?.lastname || '';
  return (
    <Layout title={"Dashboard-Rentify"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Name: {`${firstName} ${lastName}`}</h3>
              <h3>Email: {auth?.user?.email}</h3>
              <h3>Phone: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard

