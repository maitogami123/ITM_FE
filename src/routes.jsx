import {
  CompetitionsTable,
  RewardsTable,
  Home,
  StaffsTable,
  UnitsTable,
} from "@/pages/dashboard";
import {
  HomeIcon,
  TableCellsIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { UsersTable } from "./pages/dashboard/users-table";
import { PositionsTable } from "./pages/dashboard/positions-table";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    title: "Admin ",
    layout: "admin",
    pages: [
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Danh Sách Bậc Lương",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Cán bộ",
        path: "/staffs",
        element: <StaffsTable />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Đơn vị",
        path: "/units",
        element: <UnitsTable />,
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "Positions",
      //   path: "/positions",
      //   element: <PositionsTable />,
      // },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Thi đua",
        path: "/competitions",
        element: <CompetitionsTable />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Phần thưởng",
        path: "/rewards",
        element: <RewardsTable />,
      },
    ],
  },
  {
    title: "super admin",
    layout: "admin",
    pages: [
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Người dùng",
        path: "/users",
        element: <UsersTable />,
      },
    ],
  },
];

export default routes;
