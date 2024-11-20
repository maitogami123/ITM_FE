import { getStaffUnitless, updateStaffUnit } from "@/services/staffService";
import Toast from "@/widgets/toast/toast-message";
import { UserPlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

const TABLE_HEAD = ["Member", "Function", "Status"];

export function AddStaffForms({ open, handleOpen, id }) {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffResponse = await getStaffUnitless();
        if (staffResponse.status === 200) {
          const allStaff = staffResponse.data;
          setStaffList([...allStaff]);
        }
      } catch (error) {
        console.error("Error fetching unit data:", error);
      }
    };
    fetchData();
  }, [id, open]);

  const handleAddStaff = async (staffId, unitId) => {
    try {
      const updateReponse = await updateStaffUnit({
        staffId: staffId,
        unitId: unitId,
      });
      if (updateReponse.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Add User To Unit Successfully",
          showCloseButton: false,
          timer: 2000,
        });
        handleOpen();
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Add User To Unit Failed",
        text: error,
        showCloseButton: false,
        timer: 2000,
      });
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Dialog
      size="lg"
      open={open}
      handler={handleOpen}
      className="h-[70vh] overflow-y-scroll p-4"
    >
      {/* Header */}
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          Add Staff
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
        <>
          <Typography
            variant="small"
            className="mb-2 block font-medium text-gray-900"
          >
            Add user
          </Typography>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Staffs
            </Typography>
            <table className="mt-4 h-full w-full min-w-max table-auto overflow-y-scroll text-left">
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
                {staffList?.length > 0 ? (
                  staffList.map(({ _id, mscb, name }, index) => {
                    const isLast = index === staffList.length - 1;
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
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {_id}
                            </Typography>
                          </div>
                        </td>
                        <td className={rowClass}>
                          <Tooltip content="Delete User">
                            <IconButton
                              onClick={(e) => {
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
                    <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      </DialogBody>
    </Dialog>
  );
}
