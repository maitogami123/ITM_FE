import { getUserById } from "@/services/userService";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CreateUserForm } from "../forms/users/create-user";
import { UpdateUserForm } from "../forms/users/update-user";

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
      className="max-h-[70vh] p-4 "
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
          <UpdateUserForm id={id} handleOpen={handleOpen} />
        ) : (
          <CreateUserForm handleOpen={handleOpen} />
        )}
      </DialogBody>
    </Dialog>
  );
}
