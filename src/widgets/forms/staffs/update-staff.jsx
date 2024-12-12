import {
  createStaff,
  getStaffById,
  updateStaff,
} from "@/services/staffService";
import { getAllUnits } from "@/services/unitService";
import { validateDate } from "@/utils/helper";
import Toast from "@/widgets/toast/toast-message";
import {
  Button,
  Checkbox,
  Input,
  Select,
  Typography,
  Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export function UpdateStaffForm({ handleOpen, id }) {
  const [unitList, setUnitList] = useState([]);
  const [data, setData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      gender: "not_declare",
      isPermanent: false,
      qualificationCode: "Thạc sĩ",
      teacherGrade: "V.07.01.01",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUnits();
        if (response.status === 200) {
          let { data } = response.data;
          setUnitList(data);
        } else {
          throw new Error("có lỗi xảy ra trong quá trình tìm kiếm");
        }
      } catch (error) {
        console.log("search error: " + error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await getStaffById(id);
        if (response.status === 200) {
          reset(response.data);
          setData(response.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching unit data:", error);
      }
    };
    fetchData();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const createReponse = await updateStaff(data);
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
        text: error.response.data.message,
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
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="gender">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Gender: {data.gender}
              </Typography>
            </label>
            <Controller
              name="gender"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  size="lg"
                  className={`w-full border-t-blue-gray-200 placeholder:opacity-100 ${
                    errors.gender
                      ? "focus:border-t-red-600"
                      : "focus:border-t-gray-900"
                  }`}
                  containerProps={{ className: "!min-w-full" }}
                  labelProps={{ className: "hidden" }}
                  onChange={(value) => field.onChange(value)}
                >
                  <Option value="not_declare">Not declared</Option>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              )}
            />
            {errors.gender && (
              <Typography variant="small" color="red">
                Gender is required
              </Typography>
            )}
          </div>
          <div>
            <label htmlFor="isPermanent">
              <Typography
                variant="small"
                className="block font-medium text-gray-900"
              >
                Permanent Contract
              </Typography>
            </label>
            <Checkbox
              id="isPermanent"
              type="checkbox"
              color="gray"
              size="lg"
              name="isPermanent"
              label="True"
              placeholder="name@mail.com"
              {...register("isPermanent")}
            />
          </div>
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
              placeholder="MM/DD/YYYY"
              className={`w-full border-t-blue-gray-200 placeholder:opacity-100 ${
                errors.dateOfBirth
                  ? "focus:border-t-red-600"
                  : "focus:border-t-gray-900"
              }`}
              labelProps={{
                className: "hidden",
              }}
              {...register("dateOfBirth", {
                required: "Date of Birth is required",
                validate: validateDate,
              })}
              error={errors.dateOfBirth ? true : false}
            />
            {errors.dateOfBirth && (
              <Typography variant="small" color="red">
                {errors.dateOfBirth.message}
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
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="unit">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Unit: {data.unit && data.unit.name}
            </Typography>
          </label>
          <Controller
            name="unit"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                size="lg"
                className={`w-full border-t-blue-gray-200 placeholder:opacity-100 ${
                  errors.unit
                    ? "focus:border-t-red-600"
                    : "focus:border-t-gray-900"
                }`}
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
                onChange={(value) => field.onChange(value)}
              >
                {unitList.length > 0 ? (
                  [
                    ...unitList.map((e) => {
                      return (
                        <Option
                          key={e._id}
                          value={e._id}
                          className="flex items-center gap-2"
                        >
                          {e.name}
                        </Option>
                      );
                    }),
                  ]
                ) : (
                  <Option disabled>No Unit Available</Option>
                )}
              </Select>
            )}
          />
          {errors.unit && (
            <Typography variant="small" color="red">
              Unit is required
            </Typography>
          )}
        </div>
        <div>
          <label htmlFor="qualificationCode">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Qualification: {data.qualificationCode}
            </Typography>
          </label>
          <Controller
            name="qualificationCode"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                size="lg"
                className={`w-full border-t-blue-gray-200 placeholder:opacity-100 ${
                  errors.qualificationCode
                    ? "focus:border-t-red-600"
                    : "focus:border-t-gray-900"
                }`}
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
                onChange={(value) => field.onChange(value)}
              >
                <Option value="Giáo sư">Giáo sư</Option>
                <Option value="Phó giáo sư">Phó giáo sư</Option>
                <Option value="Tiến sĩ">Tiến sĩ</Option>
                <Option value="Thạc sĩ">Thạc sĩ</Option>
              </Select>
            )}
          />
          {errors.qualificationCode && (
            <Typography variant="small" color="red">
              Qualification is required
            </Typography>
          )}
        </div>
        <div>
          <div>
            <label htmlFor="startDate">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Start Date
              </Typography>
            </label>
            <Input
              id="startDate"
              type="text"
              color="gray"
              size="lg"
              name="startDate"
              placeholder="MM/DD/YYYY"
              className={`w-full border-t-blue-gray-200 placeholder:opacity-100 ${
                errors.startDate
                  ? "focus:border-t-red-600"
                  : "focus:border-t-gray-900"
              }`}
              labelProps={{
                className: "hidden",
              }}
              {...register("startDate", {
                validate: validateDate,
              })}
              error={errors.startDate ? true : false}
            />
            {errors.startDate && (
              <Typography variant="small" color="red">
                {errors.startDate.message}
              </Typography>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="gender">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Teacher Grade: {data.teacherGrade}
            </Typography>
          </label>
          <Controller
            name="teacherGrade"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                size="lg"
                className={`w-full border-t-blue-gray-200 placeholder:opacity-100 ${
                  errors.teacherGrade
                    ? "focus:border-t-red-600"
                    : "focus:border-t-gray-900"
                }`}
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
                onChange={(value) => field.onChange(value)}
              >
                <Option value="V.07.01.01">V.07.01.01</Option>
                <Option value="V.07.01.02">V.07.01.02</Option>
                <Option value="V.07.01.03">V.07.01.03</Option>
              </Select>
            )}
          />
          {errors.teacherGrade && (
            <Typography variant="small" color="red">
              Teacher Grade is required
            </Typography>
          )}
        </div>
      </div>
      <div className="mt-6 flex flex gap-4 self-end">
        <Button color="red" className="ml-auto" onClick={handleOpen}>
          Close
        </Button>
        <Button color="green" size="md" type="submit">
          Update staff
        </Button>
      </div>
    </form>
  );
}
