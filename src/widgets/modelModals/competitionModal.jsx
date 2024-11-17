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

const TABLE_HEAD = ["Name", "Description", "Start Date", "End Date"];
const TABLE_HEAD_REWARDS = ["title", "Date", "Start Date", "End Date"];

export function AddCompetitionDialog({ open, handleOpen, id }) {
  const [data, setData] = useState(null); // Use null to indicate loading state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await getCompetitionById(id);
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
          Manage Item
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
                Name
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Name"
                name="name"
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
                Staffs
              </Typography>

              {/* Table */}
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
                  {data?.projects?.length > 0 ? (
                    data.projects.map(
                      (
                        { _id, title, description, startDate, endDate },
                        index
                      ) => {
                        const isLast = index === data.staffs.length - 1;
                        const rowClass = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";

                        return (
                          <tr key={_id}>
                            <td className={rowClass}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {title}
                              </Typography>
                            </td>
                            <td className={rowClass}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {description}
                              </Typography>
                            </td>
                            <td className={rowClass}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {startDate}
                              </Typography>
                            </td>
                            <td className={rowClass}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {endDate}
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan={TABLE_HEAD.length}
                        className="p-4 text-center"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
                  {data?.rewards?.length > 0 ? (
                    data.rewards.map(({ _id, title, date, staff }, index) => {
                      const isLast = index === data.staffs.length - 1;
                      const rowClass = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={_id}>
                          <td className={rowClass}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {title}
                            </Typography>
                          </td>
                          <td className={rowClass}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {date}
                            </Typography>
                          </td>
                          {/* <td className={rowClass}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {staff}
                            </Typography>
                          </td> */}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={TABLE_HEAD.length}
                        className="p-4 text-center"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
