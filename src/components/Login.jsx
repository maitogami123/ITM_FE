import React, { useContext } from "react";
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login: loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(data.username, data.password);
      loginContext(response.data.token);
      navigate("/admin");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardBody>
          <Typography variant="h4" className="mb-6 text-center">
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Input
                type="text"
                label="Username"
                {...register("username", { required: true })}
                error={errors.username ? true : false}
              />
              {errors.username && (
                <Typography variant="small" color="red">
                  Username is required
                </Typography>
              )}
            </div>
            <div className="mb-6">
              <Input
                type="password"
                label="Password"
                {...register("password", { required: true })}
                error={errors.password ? true : false}
              />
              {errors.password && (
                <Typography variant="small" color="red">
                  Password is required
                </Typography>
              )}
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
