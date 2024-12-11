import { getStaffById } from "@/services/staffService";
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
import { AddStaffForms } from "../forms/units/add-staff";
import { CreateStaffForm } from "../forms/staffs/create-staff";
import { UpdateStaffForm } from "../forms/staffs/update-staff";

const TABLE_HEAD = ["Name", "Description", "Start Date", "End Date"];
const TABLE_HEAD_REWARDS = ["title", "Date", "Start Date", "End Date"];

export function AddStaffDialog({ open, handleOpen, id }) {
  const [loading, setLoading] = useState(false);

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
          Cập nhật thông tin giảng viên
        </Typography>
        <Typography className="mt-1 font-normal text-gray-600">
          Cập nhật thông tin
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
          <UpdateStaffForm handleOpen={handleOpen} id={id} />
        ) : (
          <CreateStaffForm handleOpen={handleOpen} />
        )}
      </DialogBody>
    </Dialog>
  );
}
