import {
  getExportSalary,
  getListSalaryIncrements,
} from "@/services/staffService";
import JoinNow from "@/widgets/campain/join-now";
import ListSalaryTable from "@/widgets/listSalary/ListSalaryTable";
import Toast from "@/widgets/toast/toast-message";
import { CheckIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  Input,
  CardFooter,
  CardHeader,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export function Home() {
  const [page, setPage] = useState({ total: 0, page: 1, limit: 10, pages: 1 });
  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
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
          const response = await getExportSalary();
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
            a.download = "salaryIncrements_statistics.xlsx"; // Tên file tải xuống
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Hiển thị thông báo thành công
            Toast.fire({
              title: "Exported!",
              text: "Salary Increments has been exported.",
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
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 ">
        <JoinNow />
      </div>
      <Card className="my-4 h-full w-full">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex items-center justify-between p-6"
        >
          <div>
            <Typography variant="h5" color="blue-gray" className="mb-1">
              List Salary
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
              <strong>List Salary Increments</strong> during this period
            </Typography>
          </div>
          <div>
            <Input
              type="text"
              value={searchQuery}
              placeholder="Tên cán bộ"
              label="Search"
              onChange={handleSearch}
            />
          </div>
          <Menu placement="left-start">
            <MenuHandler>
              <IconButton size="sm" variant="text" color="blue-gray">
                <EllipsisVerticalIcon
                  strokeWidth={3}
                  className="h-6 w-6 text-blue-gray-600"
                />
              </IconButton>
            </MenuHandler>
            <MenuList>
              <MenuItem
                onClick={() => {
                  handleExport();
                }}
              >
                Export to Excel
              </MenuItem>
              <MenuItem>Another Action</MenuItem>
              <MenuItem>Something else here</MenuItem>
            </MenuList>
          </Menu>
        </CardHeader>

        <ListSalaryTable
          currentPage={currentPage}
          setPageData={setPage}
          searchText={searchQuery}
        />

        <CardFooter className="flex items-center justify-between border-t p-4">
          <Typography variant="small" color="blue-gray">
            Page {page.page} of {page.pages}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              disabled={page.page === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Button
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
    </div>
  );
}

export default Home;
