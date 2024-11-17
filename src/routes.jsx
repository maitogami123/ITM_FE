import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import {
  Home,
  StaffsTable,
  UnitsTable,
  CompetitionsTable,
} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { UsersTable } from "./pages/dashboard/users-table";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    title: "Admin pages",
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
    ],
  },
  {
    title: "auth pages",
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
