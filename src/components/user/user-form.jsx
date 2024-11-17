import React from "react";
import { useForm } from "react-hook-form";
import { Typography, Textarea, Input, Button } from "@material-tailwind/react";
import { updateBasicInfo } from "@/services/userService";
import Swal from "sweetalert2";

const UserProfileForm = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: user.description,
      email: user.email,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await updateBasicInfo(
        user._id,
        data.description,
        data.email
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Update Successful",
          text: "Your basic information has been updated successfully!",
        });
      }
    } catch (error) {
      console.error("Login failed", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "There was an error updating your information. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" color="blue-gray">
        Basic Information
      </Typography>
      <Typography variant="small" className="mt-1 font-normal text-gray-600">
        Update your profile information below.
      </Typography>

      <div className="mt-8 flex flex-col">
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Description
            </Typography>
            <Textarea
              {...register("description")}
              size="lg"
              placeholder="This should be where your description be..."
              labelProps={{
                className: "hidden",
              }}
              className="w-full border-t-blue-gray-200 placeholder:opacity-100 focus:border-t-gray-900"
            />
          </div>
        </div>
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Email
            </Typography>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              labelProps={{
                className: "hidden",
              }}
              className="w-full border-t-blue-gray-200 placeholder:opacity-100 focus:border-t-gray-900"
              size="lg"
              placeholder="example@domain.com"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button type="submit" color="green">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserProfileForm;
