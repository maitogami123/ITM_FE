import { deleteReward, getAllRewards } from "@/services/rewardService";
import {
  AddRewardDialog,
  AddStaffToRewardDialog,
  UpdateRewardDialog,
} from "@/widgets/modelModals/rewardModal";
import Toast from "@/widgets/toast/toast-message";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const TABLE_HEAD = ["Title", "Year", "Status", "Employed", ""];

export function RewardsTable() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [addStaffOpen, setAddStaffOpen] = useState(false);
  const [idUnit, setIdUnit] = useState("");
  const handleAddStaffOpen = () => setAddStaffOpen(!addStaffOpen);
  const handleOpenUpdate = () => setOpenUpdate(!openUpdate);
  const handleOpenCreate = () => setOpenCreate(!openCreate);
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  let [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllRewards(null, currentPage);
      console.log(response);
      if (response.status === 200) {
        const { data, total, page, limit, pages } = response.data;
        setData(data);
        setPage({ total, page, limit, pages });
        setLoading(false);
      } else {
        throw new Error("có lỗi xảy ra trong quá trình tìm kiếm");
      }
    } catch (error) {
      console.error(error.message);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          const deleteReponse = await deleteReward({ id });
          if (deleteReponse.status === 200) {
            Toast.fire({
              title: "Deleted!",
              text: "Reward has been deleted.",
              icon: "success",
            });
            setData((prev) => {
              return prev.filter((item) => item._id !== id);
            });
          }
        } catch (e) {
          Toast.fire({
            title: "Error!",
            text: "Reward delete failed.",
            icon: "error",
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);
  return (
    <>
      <AddRewardDialog
        open={openCreate}
        handleOpen={handleOpenCreate}
        onCompetitionAdded={fetchData}
      />
      <UpdateRewardDialog
        open={openUpdate}
        handleOpen={handleOpenUpdate}
        id={idUnit}
      />
      <AddStaffToRewardDialog
        open={addStaffOpen}
        handleOpen={handleAddStaffOpen}
        id={idUnit}
      />
      {/* <AddCompetitionDialog open={openCreate} handleOpen={handleOpenCreate} /> */}
      <Card className="my-4 h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Rewards list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all rewards
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                view all
              </Button>
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={() => {
                  handleOpenCreate();
                }}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Reward
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
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
                  {data.map(
                    ({ _id, title, date, staff, competition }, index) => {
                      const isLast = index === data.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        //         <div className="flex items-center justify-center">
                        //   <div className="h-8 w-8 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
                        // </div>
                        <tr key={_id}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {title}
                                </Typography>
                                {/* <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {mscb}
                        </Typography> */}
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {date}
                              </Typography>
                              {/* <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {mainSpecialization}
                      </Typography> */}
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                variant="ghost"
                                size="sm"
                                value={date ? "online" : "offline"}
                                color={date ? "green" : "blue-gray"}
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {date}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Tooltip content="Edit Reward">
                              <IconButton
                                onClick={() => {
                                  handleOpenUpdate();
                                  setIdUnit(_id);
                                }}
                                variant="text"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Add Reward To Competition">
                              <IconButton
                                onClick={() => {
                                  setIdUnit(_id);
                                  handleAddStaffOpen();
                                }}
                                variant="text"
                              >
                                <UserPlusIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Delete Competition">
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
                    }
                  )}
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
