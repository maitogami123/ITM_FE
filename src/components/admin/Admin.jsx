import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ManageStaff from "./ManageStaff";
import ManageRewards from "./ManageRewards";

const Admin = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <nav>
        <ul>
          <li>
            <Link to="manage-staff">Manage Staff</Link>
          </li>
          <li>
            <Link to="manage-rewards">Manage Rewards</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="manage-staff" element={<ManageStaff />} />
        <Route path="manage-rewards" element={<ManageRewards />} />
      </Routes>
    </div>
  );
};

export default Admin;
