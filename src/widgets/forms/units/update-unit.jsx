import {
  getUnitById,
  removeStaffFromUnit,
  updateUnit,
} from "@/services/unitService";
import Toast from "@/widgets/toast/toast-message";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Input,
  Typography,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const TABLE_HEAD = [
  "Member",
  "Employee",
  "Sex",
  "Phone",
  "Email",
  "Start Date",
  "Actions",
];

export function UpdateUnitForm({ handleOpen, id }) {
  const [data, setData] = useState(null); // Use null to indicate loading state
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUnitById(id);
        if (response.status === 200) {
          console.log(response.data);
          setData(response.data);
          reset(response.data);
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
      const updateReponse = await updateUnit({ id: id, name: data.name });
      if (updateReponse.status === 200) {
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

  const handleDelete = (staffId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteReponse = await removeStaffFromUnit(staffId, id);
          if (deleteReponse.status === 200) {
            Swal.fire({
              title: "Removed!",
              text: "Staff has been removed.",
              icon: "success",
            });
          }
        } catch (e) {
          Swal.fire({
            title: "Error!",
            text: "Remove staff failed.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 text-left"
      >
        <div className="flex flex-col gap-4">
          <div className="">
            <label htmlFor="email">
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
                errors.name
                  ? "focus:border-t-red-600"
                  : "focus:border-t-gray-900"
              }`}
              labelProps={{
                className: "hidden",
              }}
              {...register("name", { required: true })}
              error={errors.name ? true : false}
            />
            {errors.name && (
              <Typography variant="small" color="red">
                Unit name is required
              </Typography>
            )}
          </div>
        </div>
        <div className="flex gap-4 self-end">
          <Button color="green" size="md" type="submit">
            Cập nhật
          </Button>
        </div>
      </form>
      <div>
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-1 text-left font-medium"
        >
          Staffs
        </Typography>
        <div className="mt-4 max-h-96 overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.staffs?.length > 0 ? (
                data.staffs.map(
                  (
                    { _id, mscb, name, gender, startDate, notes, phone, user },
                    index
                  ) => {
                    const isLast = index === data.staffs.length - 1;
                    const rowClass = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={_id}>
                        <td className={rowClass}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {mscb}
                            </Typography>
                          </div>
                        </td>
                        <td className={rowClass}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {notes || <i>Đang chờ cập nhật</i>}
                          </Typography>
                        </td>
                        <td className={rowClass}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {gender ? "Male" : "Female"}
                          </Typography>
                        </td>
                        <td className={rowClass}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {phone}
                          </Typography>
                        </td>
                        <td className={rowClass}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user?.email || <i>Email chưa được cập nhật</i>}
                          </Typography>
                        </td>
                        <td className={rowClass}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {startDate}
                          </Typography>
                        </td>
                        <td className={rowClass}>
                          <Tooltip content="Delete User">
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(_id);
                              }}
                              variant="text"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
