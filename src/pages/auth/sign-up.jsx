import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/services/authService";
import { AuthContext } from "@/context/AuthContext";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

export function SignUp() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
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
    <section className="grid h-screen items-center p-8 text-center">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign Up
        </Typography>
        <Typography className="mb-8 text-[18px] font-normal text-gray-600">
          Let's register an account
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Username
              </Typography>
            </label>
            <Input
              id="username"
              type="text"
              color="gray"
              size="lg"
              name="username"
              placeholder="name@mail.com"
              className={`w-full border-t-blue-gray-200 placeholder:opacity-100 ${
                errors.username
                  ? "focus:border-t-red-600"
                  : "focus:border-t-gray-900"
              }`}
              labelProps={{
                className: "hidden",
              }}
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
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className={`w-full border-t-blue-gray-200 placeholder:opacity-100 focus:${
                errors.password ? "border-t-red-600" : "border-t-gray-900"
              }`}
              type={passwordShown ? "text" : "password"}
              error={errors.password ? true : false}
              {...register("password", { required: true })}
              icon={
                <i onClick={() => setPasswordShown((curr) => !curr)}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
            {errors.password && (
              <Typography variant="small" color="red">
                Password is required
              </Typography>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Confirm Password
              </Typography>
            </label>
            <Input
              id="confirm-password"
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className={`w-full border-t-blue-gray-200 placeholder:opacity-100 focus:${
                errors.confirmPassword
                  ? "border-t-red-600"
                  : "border-t-gray-900"
              }`}
              type={confirmPasswordShown ? "text" : "password"}
              error={errors.confirmPassword ? true : false}
              {...register("confirm-password", { required: true })}
              icon={
                <i onClick={() => setConfirmPasswordShown((curr) => !curr)}>
                  {confirmPasswordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
            {errors.password && (
              <Typography variant="small" color="red">
                Password is required
              </Typography>
            )}
          </div>
          <Button
            color="gray"
            size="lg"
            className="mt-6"
            fullWidth
            type="submit"
          >
            sign up
          </Button>
          <Button
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />
            sign up with google
          </Button>
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Already have an account?{" "}
            <Link to={"/sign-in"} className="font-medium text-gray-900">
              Log in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
