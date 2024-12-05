import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Avatar, Button } from "@material-tailwind/react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-500">
      <div className="flex items-center">
        <Link to="/">
          <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8" />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Avatar src="/path/to/avatar.png" alt="Avatar" />
            <span className="text-white">{user.username}</span>
            <Button color="red" ripple={true} onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button color="light-blue" ripple={true}>
                Login
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
