import {
  ChevronDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

export default function ProfileMenu({ user, logout }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 "
        >
          <Avatar
            variant="circular"
            size="sm"
            alt={user.username}
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <Typography className="uppercase">{user.username}</Typography>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <Link to={`/profile/${user.id}`}>
          <MenuItem
            key={"my-profile"}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`flex items-center gap-2 rounded`}
          >
            {React.createElement(UserCircleIcon, {
              className: `h-4 w-4`,
              strokeWidth: 2,
            })}
            <Typography
              as="span"
              variant="small"
              className="font-normal"
              color={"inherit"}
            >
              My Profile
            </Typography>
          </MenuItem>
        </Link>
        <MenuItem
          key={"help"}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={`flex items-center gap-2 rounded`}
        >
          {React.createElement(LifebuoyIcon, {
            className: `h-4 w-4`,
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color={"inherit"}
          >
            Help
          </Typography>
        </MenuItem>
        <MenuItem
          key={"Logout"}
          onClick={logout}
          className={` flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10
            active:bg-red-500/10`}
        >
          {React.createElement(PowerIcon, {
            className: `h-4 w-4 text-red-500`,
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color={"red"}
          >
            Logout
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
