import { getAvailableStaff } from "@/services/staffService";
import { getUserById, updateUser } from "@/services/userService";
import Toast from "@/widgets/toast/toast-message";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export function UpdateUserForm({ open, handleOpen, id }) {
  const [staffList, setStaffList] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { role: "lecturer", staff: "" },
  });

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const userResponse = await getUserById(id);
        const staffResponse = await getAvailableStaff();
        if (staffResponse.status === 200) {
          const allStaff = staffResponse.data;
          if (userResponse.status === 200 && userResponse.data.staff) {
            setUserData(userResponse.data);
            const userStaff = userResponse.data.staff;
            setStaffList([...allStaff, userStaff]); // Ensure user’s staff is included in the list
            reset({ ...userResponse.data, staff: userStaff._id }); // Set default staff value
          } else {
            setStaffList(allStaff);
            reset(userResponse.data);
          }
        }
      } catch (error) {
        console.error("Error fetching unit data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const createReponse = await updateUser(data);
      if (createReponse.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Update User Successfully",
          showCloseButton: false,
          timer: 2000,
        });
        handleOpen();
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Update User Failed",
        text: error,
        showCloseButton: false,
        timer: 2000,
      });
      console.error("Error fetching data:", error);
    }
  };

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
            readOnly
            {...register("username")}
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
            type="password"
            labelProps={{
              className: "hidden",
            }}
            className={`w-full border-t-blue-gray-200 placeholder:opacity-100 focus:${
              errors.password ? "border-t-red-600" : "border-t-gray-900"
            }`}
            error={errors.password ? true : false}
            {...register("password")}
          />
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
      <div>
        <label htmlFor="staff">
          <Typography
            variant="small"
            className="mb-2 block font-medium text-gray-900"
          >
            Current Staff:{" "}
            {userData.staff
              ? `${userData.staff.mscb} - ${userData.staff.name}`
              : "Not assigned"}
          </Typography>
        </label>
        <Controller
          name="staff"
          control={control}
          render={({ field }) => (
            <Select
              size="lg"
              className={`w-full border-t-blue-gray-200 placeholder:opacity-100 focus:border-t-gray-900`}
              containerProps={{ className: "!min-w-full" }}
              labelProps={{ className: "hidden" }}
              onChange={(e) => {
                field.onChange(e);
              }}
            >
              {staffList.length > 0 ? (
                staffList.map((e) => {
                  return (
                    <Option
                      key={e._id}
                      value={e._id}
                      className="flex items-center gap-2"
                    >
                      {e.mscb} - {e.name}
                    </Option>
                  );
                })
              ) : (
                <Option disabled>No Staff Available</Option>
              )}
            </Select>
          )}
        />
      </div>
      <div className="mt-6 flex flex gap-4 self-end">
        <Button color="red" className="ml-auto" onClick={handleOpen}>
          Close
        </Button>
        <Button color="green" size="md" type="submit">
          Update user
        </Button>
      </div>
    </form>
  );
}
