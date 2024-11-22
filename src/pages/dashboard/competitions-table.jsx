import {
  deleteCompetition,
  getAllCompetitions,
  getExportCompetition,
} from "@/services/competitionService";
import {
  AddCompetitionDialog,
  AddRewardToCompetitionDialog,
  AddStaffToCompetitionDialog,
  UpdateCompetitionDialog,
} from "@/widgets/modelModals/competitionModal";
import Toast from "@/widgets/toast/toast-message";
import {
  ArrowDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  GiftTopIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import {
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

const TABLE_HEAD = ["Title", "Year", "Status", "Description", ""];

export function CompetitionsTable() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [addStaffOpen, setAddStaffOpen] = useState(false);
  const [addRewardOpen, setAddRewardOpen] = useState(false);
  const [idUnit, setIdUnit] = useState("");
  const handleOpenUpdate = () => setOpenUpdate(!openUpdate);
  const handleOpenCreate = () => setOpenCreate(!openCreate);
  const handleAddStaffOpen = () => setAddStaffOpen(!addStaffOpen);
  const handleAddRewardOpen = () => setAddRewardOpen(!addRewardOpen);
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
      const response = await getAllCompetitions(null, currentPage);
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

  useEffect(() => {
    fetchData();
  }, [currentPage]);

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
          const deleteReponse = await deleteCompetition({ id });
          if (deleteReponse.status === 200) {
            Toast.fire({
              title: "Deleted!",
              text: "Account has been deleted.",
              icon: "success",
            });
            setData((prev) => {
              return prev.filter((item) => item._id !== id);
            });
          }
        } catch (e) {
          Toast.fire({
            title: "Error!",
            text: "Account delete failed.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleExport = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, export it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await getExportCompetition();
          if (response.status === 200) {
            // Tạo blob từ dữ liệu trả về
            const blob = new Blob([response.data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            // Tạo URL tạm thời từ blob
            const url = window.URL.createObjectURL(blob);

            // Tạo thẻ <a> để tải file
            const a = document.createElement("a");
            a.href = url;
            a.download = "competition_statistics.xlsx"; // Tên file tải xuống
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Hiển thị thông báo thành công
            Toast.fire({
              title: "Exported!",
              text: "Competition has been exported.",
              icon: "success",
            });

            // Giải phóng URL
            window.URL.revokeObjectURL(url);
          }
        } catch (e) {
          // Hiển thị thông báo lỗi
          Toast.fire({
            title: "Error!",
            text: "Competition export failed.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      <UpdateCompetitionDialog
        open={openUpdate}
        handleOpen={handleOpenUpdate}
        id={idUnit}
        onCompetitionAdded={fetchData}
      />
      <AddCompetitionDialog
        open={openCreate}
        handleOpen={handleOpenCreate}
        onCompetitionAdded={fetchData}
      />
      <AddStaffToCompetitionDialog
        open={addStaffOpen}
        handleOpen={handleAddStaffOpen}
        id={idUnit}
        onCompetitionAdded={fetchData}
      />
      <AddRewardToCompetitionDialog
        open={addRewardOpen}
        handleOpen={handleAddRewardOpen}
        id={idUnit}
        onCompetitionAdded={fetchData}
      />
      <Card className="my-4 h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Competitions list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all competitions
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
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                competition
              </Button>
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={() => {
                  handleExport();
                }}
              >
                <ArrowDownIcon strokeWidth={2} className="h-4 w-4" /> Export
                competitions
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
                    (
                      {
                        _id,
                        title,
                        year,
                        description,
                        projects,
                        staffs,
                        rewards,
                      },
                      index
                    ) => {
                      const isLast = index === data.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={_id}>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {title}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {year}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {staffs.length}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {description}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Tooltip content="Edit Competition">
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
                            <Tooltip content="Add Staff To Competition">
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
                            <Tooltip content="Add Reward To Competition">
                              <IconButton
                                onClick={() => {
                                  setIdUnit(_id);
                                  handleAddRewardOpen();
                                }}
                                variant="text"
                              >
                                <GiftTopIcon className="h-4 w-4" />
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
