import { createStaff } from "@/services/staffService";
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
import { TeacherGrade, QualificationCode } from "@/utils/constant";

export function CreateStaffForm({ handleOpen }) {
  const [unitList, setUnitList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      gender: "not_declare",
      isPermanent: false,
      qualificationCode: QualificationCode.ThS,
      teacherGrade: TeacherGrade.GRADE_III,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await getAllUnits(null, currentPage);
        const response = await getAllUnits();
        console.log(response);
        if (response.status === 200) {
          const { data } = response.data;
          console.log(data);
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

  const onSubmit = async (data) => {
    try {
      const createReponse = await createStaff(data);

      if (createReponse.status === 201) {
        Toast.fire({
          icon: "success",
          title: "Create Staff Successfully",
          showCloseButton: false,
          timer: 1000,
        });
        window.location.reload();

        handleOpen();
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Create Staff Failed",
        text: error,
        showCloseButton: false,
        timer: 1000,
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
              Mã số giảng viên
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
              Họ tên giảng viên
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
                Giới tính
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
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                </Select>
              )}
            />
            {errors.gender && (
              <Typography variant="small" color="red">
                Giới tính là bắt buộc
              </Typography>
            )}
          </div>
          <div>
            <label htmlFor="isPermanent">
              <Typography
                variant="small"
                className="block font-medium text-gray-900"
              >
                Giảng viên chính thức
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
                Ngày sinh
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
              Số điện thoại
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
        {/* <div className="mb-6 ">
          <label htmlFor="mainSpecialization">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Chuyên ngành chính
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
        </div> */}
      </div>
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="unit">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Khoa
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
                  <Option disabled>Khoa hiện rỗng</Option>
                )}
              </Select>
            )}
          />
          {errors.unit && (
            <Typography variant="small" color="red">
              Khoa là bắt buộc
            </Typography>
          )}
        </div>
        <div>
          <label htmlFor="qualificationCode">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Trình độ
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
                <Option value={QualificationCode.Gs}>Giáo sư</Option>
                <Option value={QualificationCode.PGs}>Phó giáo sư</Option>
                <Option value={QualificationCode.TS}>Tiến sĩ</Option>
                <Option value={QualificationCode.ThS}>Thạc sĩ</Option>
              </Select>
            )}
          />
          {errors.qualificationCode && (
            <Typography variant="small" color="red">
              Trình độ là bắt buộc
            </Typography>
          )}
        </div>
        <div>
          <label htmlFor="teacherGrade">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Ngạch giảng viên
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
                <Option value={TeacherGrade.GRADE_I}>
                  Giảng viên cao cấp - {TeacherGrade.GRADE_I} (Hạng I)
                </Option>
                <Option value={TeacherGrade.GRADE_II}>
                  Giảng viên chính - {TeacherGrade.GRADE_II} (Hạng II)
                </Option>
                <Option value={TeacherGrade.GRADE_III}>
                  Giảng viên - {TeacherGrade.GRADE_III} (Hạng III)
                </Option>
              </Select>
            )}
          />
          {errors.teacherGrade && (
            <Typography variant="small" color="red">
              Ngạch giảng viên là bắt buộc
            </Typography>
          )}
        </div>
        <div className="mb-6">
          <div>
            <label htmlFor="dateOfBirth">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Ngày làm việc
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
      </div>
      <div className="mt-6 flex flex gap-4 self-end">
        <Button color="red" className="ml-auto" onClick={handleOpen}>
          Thoát
        </Button>
        <Button color="green" size="md" type="submit">
          Thêm
        </Button>
      </div>
    </form>
  );
}
