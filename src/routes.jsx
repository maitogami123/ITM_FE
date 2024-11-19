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

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    title: "Admin ",
    layout: "admin",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Staff",
        path: "/staffs",
        element: <StaffsTable />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Unit",
        path: "/units",
        element: <UnitsTable />,
      },

      {
        icon: <TableCellsIcon {...icon} />,
        name: "Competitions",
        path: "/competitions",
        element: <CompetitionsTable />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Rewards",
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
        name: "Users",
        path: "/users",
        element: <UsersTable />,
      },
    ],
  },
];

export default routes;
