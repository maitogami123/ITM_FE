import { getCompetitionById } from "@/services/competitionService";
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
import { getRewardById } from "@/services/rewardService";

const TABLE_HEAD = ["Name", "Description", "Start Date", "End Date"];
const TABLE_HEAD_REWARDS = ["title", "Date", "Start Date", "End Date"];

export function UpdateRewardDialog({ open, handleOpen, id }) {
  const [data, setData] = useState(null); // Use null to indicate loading state
  const [loading, setLoading] = useState(false);

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
                Date
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Title"
                name="title"
                value={data?.date || ""}
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
                Staff
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Title"
                name="title"
                value={data?.staff?.mscb + "--" + data?.staff?.name || ""}
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
                placeholder="Title"
                name="title"
                value={
                  data?.competition?.title + "--" + data?.competition?.year ||
                  ""
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
        <Button className="ml-auto" onClick={handleOpen}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export function AddRewardDialog({ open, handleOpen }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true); // Start loading
  //     try {
  //       const response = await getCompetitionById(id);
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
  // }, []);

  return (
    <Dialog size="lg" open={open} handler={handleOpen} className="p-4">
      {/* Header */}
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          Add Competition
        </Typography>
        <Typography className="mt-1 font-normal text-gray-600">
          To create a new Competition. You must full fill information.
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
            placeholder="input your Title"
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title || ""}
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
            Year
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="input your Title"
            name="title"
            onChange={(e) => {
              setYear(e.target.value);
            }}
            value={year || ""}
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
            Description
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="input your Title"
            name="title"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description || ""}
            className="placeholder:opacity-100 focus:!border-t-gray-900"
            containerProps={{ className: "!min-w-full" }}
            labelProps={{ className: "hidden" }}
          />
        </div>
        <div>
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
        </div>
      </DialogBody>

      {/* Footer */}
      <DialogFooter>
        <Button className="ml-auto" onClick={handleOpen}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
