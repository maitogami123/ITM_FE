import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      loginContext(response.data.token);
      navigate("/admin");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardBody>
          <Typography variant="h4" className="mb-6 text-center">
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Input
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" color="blue" ripple={true}>
                Login
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
