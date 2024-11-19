import { getAllRewards } from "@/services/rewardService";
import { UpdateRewardDialog } from "@/widgets/modelModals/rewardModal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Member", "Function", "Status", "Employed", ""];

export function RewardsTable() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [idUnit, setIdUnit] = useState("");
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

  useEffect(() => {
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

    fetchData();
  }, [currentPage]);
  return (
    <>
      <UpdateRewardDialog
        open={openUpdate}
        handleOpen={handleOpenUpdate}
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
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
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
                          <td
                            className={classes}
                            onClick={() => {
                              handleOpenUpdate();
                              setIdUnit(_id);
                            }}
                          >
                            <Tooltip content="Edit Reward">
                              <IconButton variant="text">
                                <PencilIcon className="h-4 w-4" />
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