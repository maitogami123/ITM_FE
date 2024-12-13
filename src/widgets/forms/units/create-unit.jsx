import { createUnit } from "@/services/unitService";
import Toast from "@/widgets/toast/toast-message";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function CreateUnitForm({ handleOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { role: "lecturer", staff: undefined },
  });

  const onSubmit = async (data) => {
    try {
      const createReponse = await createUnit(data);
      if (createReponse.status === 201) {
        Toast.fire({
          icon: "success",
          title: "Create User Successfully",
          showCloseButton: false,
          timer: 1000,
        });
        handleOpen();
        window.location.reload();
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Create User Failed",
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
      <div className="grid grid-cols-1 gap-4">
        <div className="mb-6 ">
          <label htmlFor="email">
            <Typography
              variant="small"
              className="mb-2 block font-medium text-gray-900"
            >
              Tên khoa
            </Typography>
          </label>
          <Input
            id="name"
            type="text"
            color="gray"
            size="lg"
            name="name"
            placeholder="Nhập tên khoa"
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
              Tên khoa là bắt buộc
            </Typography>
          )}
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
