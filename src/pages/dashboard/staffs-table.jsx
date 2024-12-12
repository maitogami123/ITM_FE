import { deleteStaff, getAllStaffs } from "@/services/staffService";
import { formatDate } from "@/utils/helper";
import { AddStaffDialog } from "@/widgets/modelModals/staffModal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const TABLE_HEAD = ["Members", "Mail", "Chuyên môn", "Phone", "Start Date", ""];

export function StaffsTable() {
  const [open, setOpen] = useState(false);
  const [idUnit, setIdUnit] = useState("");
  const handleOpen = () => setOpen(!open);
  const [data, setData] = useState([]);
  const [page, setPage] = useState({ total: 0, page: 1, limit: 10, pages: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAllStaffs(searchQuery, currentPage);
      if (response.status === 200) {
        const { data, total, page, limit, pages } = response.data;
        setData(data);
        setPage({ total, page, limit, pages });
      } else {
        throw new Error("An error occurred while fetching data.");
      }
    } catch (error) {
      console.error(error.message);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]);

  const handleDelete = (id) => {
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
          const deleteReponse = await deleteStaff({ id });
          setData(() => data.filter((item) => item._id !== id));
          if (deleteReponse.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Staff has been Deleted.",
              icon: "success",
            });
          }
        } catch (e) {
          Swal.fire({
            title: "Error!",
            text: "Delete staff failed.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      <AddStaffDialog open={open} handleOpen={handleOpen} id={idUnit} />
      <Card className="my-4 h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Members List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all members
              </Typography>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                View All
              </Button>
              <Button
                onClick={() => {
                  setIdUnit(null);
                  handleOpen();
                }}
                className="flex items-center gap-3"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Staff
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Tên cán bộ"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        {loading ? (
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
          </div>
        ) : (
          <CardBody className="overflow-scroll px-0">
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
              </div>
            ) : error ? (
              <Typography variant="h6" color="red" className="text-center">
                {error}
              </Typography>
            ) : (
              <table className="mt-4 w-full min-w-max table-auto text-left">
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
                  {data.map((staff, index) => {
                    const {
                      _id,
                      mscb,
                      name,
                      gender,
                      dateOfBirth,
                      phone,
                      qualificationCode,
                      isPermanent,
                      startDate,
                      notes,
                      mainSpecialization,
                      positions,
                      rewards,
                      competitions,
                      user,
                    } = staff;
                    const isLast = index === data.length - 1;
                    const rowClasses = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={_id}>
                        <td className={rowClasses}>
                          <div className="flex items-center gap-3">
                            <Avatar
                              src="/public/img/00199_tqlap.png"
                              alt={name}
                              size="sm"
                            />
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
                          </div>
                        </td>
                        <td className={rowClasses}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user?.email ? user.email : "chưa cập nhật email"}
                          </Typography>
                        </td>
                        <td className={rowClasses}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {qualificationCode
                              ? qualificationCode
                              : "Chưa cập nhật"}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {mainSpecialization}
                          </Typography>
                        </td>
                        <td className={rowClasses}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {phone}
                          </Typography>
                        </td>
                        <td className={rowClasses}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {formatDate(startDate)}
                          </Typography>
                        </td>
                        <td className={rowClasses}>
                          <Tooltip content="Edit Staff">
                            <IconButton
                              onClick={() => {
                                setIdUnit(_id);
                                handleOpen();
                              }}
                              variant="text"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Delete Staff">
                            <IconButton
                              onClick={() => {
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
                  })}
                </tbody>
              </table>
            )}
          </CardBody>
        )}

        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {page.page} of {page.pages}
          </Typography>
          <div className="flex gap-2">
            <Button
              className="rounded-full"
              variant="outlined"
              size="sm"
              disabled={page.page === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Button
              className="rounded-full"
              variant="outlined"
              size="sm"
              disabled={page.page === page.pages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
