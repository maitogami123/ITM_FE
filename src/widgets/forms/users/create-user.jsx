import {
  Button,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

export function CreateUserForm({ open, handleOpen, id }) {
  const [data, setData] = useState(null); // Use null to indicate loading state
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { role: "lecturer" },
  });

  const onSubmit = async (data) => {
    console.log(data);
    // try {
    //   const response = await registerService(data.username, data.password);
    //   if (response.status === 201) {
    //     Swal.fire({
    //       icon: "success",
    //       title: "Success!",
    //       text: "You can now use your newly created account to login!",
    //       confirmButtonText: "Ok",
    //     }).then((result) => {
    //       navigate("/sign-in");
    //     });
    //   } else {
    //     throw new Error("Register failed");
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Something went wrong!",
    //   });
    // }
  };

  // useEffect(() => {
  //   if (!id) return;
  //   const fetchData = async () => {
  //     setLoading(true); // Start loading
  //     try {
  //       const response = await getUserById(id);
  //       if (response.status === 200) {
  //         setData(response.data);
  //       } else {
  //         throw new Error("Failed to fetch data");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching unit data:", error);
  //     } finally {
  //       setLoading(false); // Stop loading
  //     }
  //   };
  //   fetchData();
  // }, [id]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 text-left"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-6 ">
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
            error={errors.password ? true : false}
            {...register("password", { required: true })}
          />
          {errors.password && (
            <Typography variant="small" color="red">
              Password is required
            </Typography>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-6 ">
          <label htmlFor="email">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Email
            </Typography>
          </label>
          <Input
            id="email"
            type="text"
            color="gray"
            size="lg"
            name="email"
            placeholder="name@mail.com"
            className={`w-full border-t-blue-gray-200 placeholder:opacity-100 ${
              errors.email
                ? "focus:border-t-red-600"
                : "focus:border-t-gray-900"
            }`}
            labelProps={{
              className: "hidden",
            }}
            {...register("email", { required: true })}
            error={errors.email ? true : false}
          />
          {errors.email && (
            <Typography variant="small" color="red">
              email is required
            </Typography>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="role">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Role
            </Typography>
          </label>
          <Controller
            name="role"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                size="lg"
                className={`w-full border-t-blue-gray-200 placeholder:opacity-100 ${
                  errors.role
                    ? "focus:border-t-red-600"
                    : "focus:border-t-gray-900"
                }`}
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
                {...field}
                onChange={(value) => field.onChange(value)}
              >
                <Option value="lecturer">Lecturer</Option>
                <Option value="leader">Leader</Option>
                <Option value="superadmin">Super Admin</Option>
              </Select>
            )}
          />
          {errors.role && (
            <Typography variant="small" color="red">
              Role is required
            </Typography>
          )}
        </div>
      </div>
      <div className="mt-6 flex flex gap-4 self-end">
        <Button color="red" className="ml-auto" onClick={handleOpen}>
          Close
        </Button>
        <Button color="green" size="md" type="submit">
          Add user
        </Button>
      </div>
    </form>
  );
}
