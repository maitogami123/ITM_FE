import {
  addStaffToReward,
  createReward,
  getRewardById,
  getRewardStaffless,
  removeStaffFromReward,
  updateReward,
} from "@/services/rewardService";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Toast from "../toast/toast-message";

const TABLE_HEAD = ["Name", "MSCB", "Main Specialization", "Action"];
const TABLE_HEAD_REWARDS = ["title", "Date", "Start Date", "End Date"];

export function UpdateRewardDialog({
  open,
  handleOpen,
  id,
  onCompetitionAdded,
}) {
  const [data, setData] = useState(null); // Use null to indicate loading state
  const [loading, setLoading] = useState(false);

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
          const deleteReponse = await removeStaffFromReward(staffId, id);
          if (deleteReponse.status === 200) {
            Swal.fire({
              title: "Removed!",
              text: "Staff has been removed.",
              icon: "success",
            });
            fetchData();
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

  const handleUpdate = async () => {
    if (!id || !data) return;

    setLoading(true); // Bắt đầu trạng thái loading
    try {
      const updatedData = {
        title: data.title,
        date: data.date,
        description: data.description,
        staff: data.staff,
        competition: data.competition,
      };

      const response = await updateReward(id, updatedData); // Gọi API cập nhật
      if (response.status === 200) {
        if (onCompetitionAdded) {
          onCompetitionAdded(response.data); // Gọi callback nếu có
        }
        handleOpen(); // Đóng dialog
      } else {
        throw new Error("Failed to update reward");
      }
    } catch (error) {
      console.error("Error updating reward:", error.message);
    } finally {
      setLoading(false); // Dừng trạng thái loading
    }
  };

  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await getRewardById(id);
      if (response.status === 200) {
        setData(response.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching unit data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id, onCompetitionAdded, open]);

  if (!id) return null;

  return (
    <Dialog size="lg" open={open} handler={handleOpen} className="p-4">
      {/* Header */}
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          Detail Reward
        </Typography>
        <Typography className="mt-1 font-normal text-gray-600">
          Keep your records up-to-date and organized.
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={handleOpen}
        >
          <XMarkIcon className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>

      {/* Body */}
      <DialogBody className="space-y-4 pb-6">
        {loading ? (
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Name Field */}
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Chủ đề
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Title"
                name="title"
                value={data?.title || ""}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
              />
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Năm
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Chủ đề"
                name="title"
                value={data?.date || ""}
                onChange={(e) => setData({ ...data, date: e.target.value })}
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              {/* Label */}
              <Typography
                variant="small"
                color="blue-gray"
                className="text-left font-medium"
              >
                Giảng viên
              </Typography>

              {/* Input Field with Tooltip */}
              <div className="flex items-center overflow-hidden rounded-md border border-gray-300">
                <Input
                  color="gray"
                  size="lg"
                  placeholder="Giảng viên"
                  name="staff"
                  value={
                    data?.staff
                      ? `${data?.staff?.mscb} -- ${data?.staff?.name}`
                      : "null"
                  }
                  readOnly
                  className="flex-grow px-3 py-2 placeholder:opacity-100 focus:!border-t-gray-900"
                  containerProps={{ className: "w-full" }}
                  labelProps={{ className: "hidden" }}
                />
                <Tooltip content="Delete User">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(data.staff._id);
                    }}
                    variant="text"
                    className="p-2"
                  >
                    <TrashIcon className="h-5 w-5 text-gray-500" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Thi đua
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Thi đua"
                name="competition"
                value={
                  data?.competition
                    ? data.competition?.title +
                      " -- " +
                      data.competition?.year +
                      ` (${data.competition?.description})`
                    : "null"
                }
                readOnly
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
              />
            </div>
          </>
        )}
      </DialogBody>

      {/* Footer */}
      <DialogFooter>
        <div className="flex gap-2">
          <Button
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={handleOpen}
          >
            Thoát
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}

export function AddRewardDialog({ open, handleOpen, onCompetitionAdded }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [staff, setStaff] = useState([]);
  const [competition, setCompetition] = useState([]);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({}); // Để lưu lỗi từng trường

  const validateFields = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Chủ đề là bắt buộc.";
    if (!date.trim()) newErrors.date = "Thời gian là bắt buộc.";
    if (!description.trim()) newErrors.description = "Nội dung là bắt buộc.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Không có lỗi -> hợp lệ
  };
  const handleCreate = async () => {
    if (!validateFields()) return; // Dừng nếu có lỗi

    const competitionData = {
      title,
      date,
      staff: null,
      competition: null,
    };

    setLoading(true);
    try {
      const response = await createReward(competitionData);
      if (response.status === 201) {
        alert("Tạo thi đua thành công!");
        handleOpen(); // Close dialog
        if (onCompetitionAdded) {
          onCompetitionAdded(); // Notify parent to reload data
        }
      } else {
        alert("Tạo khen thưởng thất bại.");
      }
    } catch (error) {
      console.error("Error creating reward:", error);
      alert("Error occurred while creating reward.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog size="lg" open={open} handler={handleOpen} className="p-4">
      {/* Header */}
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          Khen thưởng giảng viên
        </Typography>
        <Typography className="mt-1 font-normal text-gray-600">
          Nhập nội dung khen thưởng
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={handleOpen}
        >
          <XMarkIcon className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>

      {/* Body */}
      <DialogBody className="space-y-4 pb-6">
        {/* Name Field */}
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Chủ đề
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="Nhập chủ đề khen thưởng"
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: "" })); // Xóa lỗi khi người dùng nhập
            }}
            value={title || ""}
            error={!!errors.title} // Đánh dấu lỗi
            className="placeholder:opacity-100 focus:!border-t-gray-900"
            containerProps={{ className: "!min-w-full" }}
            labelProps={{ className: "hidden" }}
          />
          {errors.title && (
            <Typography variant="small" color="red" className="mt-1">
              {errors.title}
            </Typography>
          )}
        </div>
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Thời gian
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="Nhập năm"
            name="year"
            onChange={(e) => {
              setDate(e.target.value);
              setErrors((prev) => ({ ...prev, year: "" }));
            }}
            value={date || ""}
            error={!!errors.date}
            className="placeholder:opacity-100 focus:!border-t-gray-900"
            containerProps={{ className: "!min-w-full" }}
            labelProps={{ className: "hidden" }}
          />
          {errors.date && (
            <Typography variant="small" color="red" className="mt-1">
              {errors.date}
            </Typography>
          )}
        </div>
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Nội dung
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="Nhập mô tả"
            name="description"
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: "" }));
            }}
            value={description || ""}
            error={!!errors.description}
            className="placeholder:opacity-100 focus:!border-t-gray-900"
            containerProps={{ className: "!min-w-full" }}
            labelProps={{ className: "hidden" }}
          />
          {errors.description && (
            <Typography variant="small" color="red" className="mt-1">
              {errors.description}
            </Typography>
          )}
        </div>
        {/* <div>
          <ComboBox
            label={"Staffs"}
            selected={staffs} // Giá trị Staff đã chọn
            setSelected={setStaffs} // Hàm cập nhật giá trị
          />
        </div>
        <div>
          <ComboBox
            label={"Rewards"}
            selected={rewards} // Giá trị Rewards đã chọn
            setSelected={setRewards} // Hàm cập nhật giá trị
          />
        </div> */}
      </DialogBody>

      {/* Footer */}
      <DialogFooter>
        <div className="flex gap-2">
          <Button
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Adding..." : "Thêm"}
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={handleOpen}
          >
            Thoát
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}

export function AddStaffToRewardDialog({
  open,
  handleOpen,
  id,
  onCompetitionAdded,
}) {
  const [data, setData] = useState(null); // Use null to indicate loading state
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await getRewardStaffless(id);
      if (response.status === 200) {
        setData(response.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching Reward data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id, onCompetitionAdded, open]);

  if (!id) return null;

  const handleAddStaff = async (staffId, rewardId) => {
    try {
      const updateResponse = await addStaffToReward(staffId, rewardId);
      if (updateResponse.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Add Staff To Reward Successfully",
          showCloseButton: false,
          timer: 2000,
        });
        fetchData();
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.response?.data?.message || "Add Staff To Reward Failed",
        showCloseButton: false,
        timer: 2000,
      });
      console.error("Error adding staff to reward:", error);
    }
  };

  return (
    <Dialog size="lg" open={open} handler={handleOpen} className="p-4">
      {/* Header */}
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          Add Staff To Reward
        </Typography>
        <Typography className="mt-1 font-normal text-gray-600">
          To add staff to reward. You must choose staff.
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={handleOpen}
        >
          <XMarkIcon className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>

      {/* Body */}
      <DialogBody className="space-y-4 overflow-auto pb-6">
        {/* Name Field */}
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Staffs
          </Typography>

          {/* Table */}
          <div
            className="max-h-96 overflow-auto"
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Thêm bóng để bảng nổi bật hơn
            }}
          >
            <table className="min-w-full table-auto border-collapse text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="sticky top-0 z-10 border-b-2 border-gray-300 bg-gray-100 p-4 text-gray-700"
                      style={{
                        textAlign: "center",
                        fontWeight: "600", // Làm chữ header đậm
                      }}
                    >
                      <Typography variant="small" className="font-medium">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map(({ _id, name, mscb, mainSpecialization }, index) => {
                    const isLast = index === data.length - 1;
                    const rowClass = isLast
                      ? "p-4"
                      : "p-4 border-b border-gray-200";
                    return (
                      <tr
                        key={index}
                        className="transition-colors duration-200 hover:bg-gray-50"
                      >
                        <td
                          className={rowClass}
                          style={{ textAlign: "center" }}
                        >
                          <Typography variant="small" className="font-normal">
                            {name}
                          </Typography>
                        </td>
                        <td
                          className={rowClass}
                          style={{ textAlign: "center" }}
                        >
                          <Typography variant="small" className="font-normal">
                            {mscb}
                          </Typography>
                        </td>
                        <td
                          className={rowClass}
                          style={{ textAlign: "center" }}
                        >
                          <Typography variant="small" className="font-normal">
                            {mainSpecialization}
                          </Typography>
                        </td>
                        <td
                          className={rowClass}
                          style={{ textAlign: "center" }}
                        >
                          <Tooltip content="Delete User">
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddStaff(_id, id);
                              }}
                              variant="text"
                            >
                              <UserPlusIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={TABLE_HEAD.length}
                      className="p-4 text-center text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </DialogBody>

      {/* Footer */}
      <DialogFooter>
        <div className="flex gap-2">
          <Button
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={handleOpen}
          >
            Close
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}
