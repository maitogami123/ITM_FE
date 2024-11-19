import {
  ChevronDoubleRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Input,
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent,
  Checkbox,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { useForm, Controller } from "react-hook-form";

export function CreateStaffForm({ handleOpen }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gender: true,
      dateOfBirth: new Date(),
      isPermanent: false,
      qualificationCode: "unknown",
    },
  });

  useEffect(() => {}, []);

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 text-left"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-6">
          <label htmlFor="mscb">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              MSCB
            </Typography>
          </label>
          <Input
            size="lg"
            placeholder="********"
            labelProps={{
              className: "hidden",
            }}
            className={`w-full border-t-blue-gray-200 placeholder:opacity-100 focus:${
              errors.mscb ? "border-t-red-600" : "border-t-gray-900"
            }`}
            error={errors.mscb ? true : false}
            {...register("mscb", { required: true })}
          />
          {errors.mscb && (
            <Typography variant="small" color="red">
              mscb is required
            </Typography>
          )}
        </div>
        <div className="mb-6 ">
          <label htmlFor="name">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Name
            </Typography>
          </label>
          <Input
            id="name"
            type="text"
            color="gray"
            size="lg"
            name="name"
            placeholder="name@mail.com"
            className={`w-full border-t-blue-gray-200 placeholder:opacity-100 ${
              errors.name ? "focus:border-t-red-600" : "focus:border-t-gray-900"
            }`}
            labelProps={{
              className: "hidden",
            }}
            {...register("name", { required: true })}
            error={errors.name ? true : false}
          />
          {errors.name && (
            <Typography variant="small" color="red">
              Name is required
            </Typography>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-6 flex">
          <label htmlFor="gender">
            <Typography
              variant="small"
              className="block font-medium text-gray-900"
            >
              Male
            </Typography>
          </label>
          <Checkbox
            id="gender"
            type="checkbox"
            color="gray"
            size="lg"
            name="gender"
            placeholder="name@mail.com"
            labelProps={{
              className: "hidden",
            }}
            {...register("gender")}
          />
        </div>
        <div className="mb-6">
          <div>
            <label htmlFor="dateOfBirth">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Date of Birth
              </Typography>
            </label>
            <Input
              id="dateOfBirth"
              type="text"
              color="gray"
              size="lg"
              name="dateOfBirth"
              placeholder="name@mail.com"
              className={`w-full border-t-blue-gray-200 placeholder:opacity-100 ${
                errors.dateOfBirth
                  ? "focus:border-t-red-600"
                  : "focus:border-t-gray-900"
              }`}
              labelProps={{
                className: "hidden",
              }}
              {...register("dateOfBirth", { required: true })}
              error={errors.dateOfBirth ? true : false}
            />
            {errors.dateOfBirth && (
              <Typography variant="small" color="red">
                Date of Birth is required
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-6 ">
          <label htmlFor="phone">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Phone
            </Typography>
          </label>
          <Input
            id="phone"
            type="text"
            color="gray"
            size="lg"
            name="gender"
            className={`w-full border-t-blue-gray-200 placeholder:opacity-100 focus:border-t-gray-900`}
            labelProps={{
              className: "hidden",
            }}
            {...register("phone")}
          />
        </div>
        <div className="mb-6 ">
          <label htmlFor="mainSpecialization">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Main Specialization
            </Typography>
          </label>
          <Input
            id="mainSpecialization"
            type="text"
            color="gray"
            size="lg"
            name="gender"
            className={`w-full border-t-blue-gray-200 placeholder:opacity-100 focus:border-t-gray-900`}
            labelProps={{
              className: "hidden",
            }}
            {...register("mainSpecialization")}
          />
        </div>
      </div>
      <div className="mt-6 flex flex gap-4 self-end">
        <Button color="red" className="ml-auto" onClick={handleOpen}>
          Close
        </Button>
        <Button color="green" size="md" type="submit">
          Add staff
        </Button>
      </div>
    </form>
  );
}
