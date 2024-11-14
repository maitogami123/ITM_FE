import ProfileMenu from "@/components/shared/profile-menu";
import { AuthContext } from "@/context/AuthContext";
import {
  Button,
  List,
  ListItem,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { useContext } from "react";
import { Link } from "react-router-dom";

export function UserNavbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full px-4 py-2">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          Material Tailwind
        </Typography>
        <div className="hidden lg:block">
          <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
            <Typography
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              <ListItem className="flex items-center gap-2 py-2 pr-4">
                Pages
              </ListItem>
            </Typography>
            <Typography
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              <ListItem className="flex items-center gap-2 py-2 pr-4">
                Account
              </ListItem>
            </Typography>
            <Typography
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              <ListItem className="flex items-center gap-2 py-2 pr-4">
                Docs
              </ListItem>
            </Typography>
          </List>
        </div>
        {!user ? (
          <div className="hidden gap-2 lg:flex">
            <Link to="/auth/sign-up">
              <Button size="sm" fullWidth>
                Get Started
              </Button>
            </Link>
            <Link to="/auth/sign-in">
              <Button type="button" variant="outlined" size="sm" fullWidth>
                Log in
              </Button>
            </Link>
          </div>
        ) : (
          <ProfileMenu logout={logout} user={user} />
        )}
      </div>
    </Navbar>
  );
}
