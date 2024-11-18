import { getUserById } from "@/services/userService";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CreateUserForm } from "../forms/users/create-user";

export function AdduserDialog({ open, handleOpen, id }) {
  const [data, setData] = useState(null); // Use null to indicate loading state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await getUserById(id);
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

  return (
    <Dialog
      size="lg"
      open={open}
      handler={handleOpen}
      className="max-h-[70vh] overflow-auto p-4"
    >
      {/* Header */}
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          {id ? "Edit" : "Add"} User
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
        ) : id ? (
          <div className="grid grid-cols-2 gap-4">
            {/* Name Field */}
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Username
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Name"
                name="name"
                value={data?.username || ""}
                readOnly
                className="border-t-gray-500 placeholder:opacity-100 focus:border-t-gray-900"
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
                Password
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Name"
                name="name"
                value={data?.password || ""}
                readOnly
                className="border-t-gray-500 placeholder:opacity-100 focus:border-t-gray-900"
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
                Role
              </Typography>
              <Select
                size="lg"
                label="Select Version"
                className="border-t-gray-500 placeholder:opacity-100 focus:border-t-gray-900"
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
              >
                <Option>Super Admin</Option>
                <Option>Leader</Option>
                <Option>Lecturer</Option>
              </Select>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Email
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Name"
                name="name"
                value={data?.email || ""}
                readOnly
                className="border-t-gray-500 placeholder:opacity-100 focus:border-t-gray-900"
                containerProps={{ className: "!min-w-full" }}
                labelProps={{ className: "hidden" }}
              />
            </div>
          </div>
        ) : (
          <CreateUserForm handleOpen={handleOpen} />
        )}
      </DialogBody>
    </Dialog>
  );
}
