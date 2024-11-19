import {
  createReward,
  getRewardById,
  updateReward,
} from "@/services/rewardService";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ComboBox } from "../combobox/ComboBox";

const TABLE_HEAD = ["Name", "Description", "Start Date", "End Date"];
const TABLE_HEAD_REWARDS = ["title", "Date", "Start Date", "End Date"];

export function UpdateRewardDialog({
  open,
  handleOpen,
  id,
  onCompetitionAdded,
}) {
  const [data, setData] = useState(null); // Use null to indicate loading state
  const [loading, setLoading] = useState(false);

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
        console.log("Update successful:", response.data);
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

  useEffect(() => {
    if (!id) return;

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

    fetchData();
  }, [id]);

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
                Title
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
                Date
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Title"
                name="title"
                value={data?.date || ""}
                onChange={(e) => setData({ ...data, date: e.target.value })}
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
                Staff
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Staff"
                name="staff"
                value={
                  data?.staff
                    ? data?.staff?.mscb + "--" + data?.staff?.name
                    : "null"
                }
                readOnly
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
                Competition
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Competition"
                name="competition"
                value={
                  data?.competition
                    ? data?.competition?.title + "--" + data?.competition?.year
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
            Close
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
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!date.trim()) newErrors.date = "Date is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
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
        alert("Competition created successfully!");
        handleOpen(); // Close dialog
        if (onCompetitionAdded) {
          onCompetitionAdded(); // Notify parent to reload data
        }
      } else {
        alert("Failed to create reward.");
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
          Add Reward
        </Typography>
        <Typography className="mt-1 font-normal text-gray-600">
          To create a new Reward. You must full fill information.
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
            Title
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="Input Title"
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
            Date
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="Input Year"
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
            Description
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="Input Description"
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
            {loading ? "Adding..." : "Add"}
          </Button>
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
