import ProfileMenu from "@/components/shared/profile-menu";
import { AuthContext } from "@/context/AuthContext";
import { Avatar, Button, Navbar, Typography } from "@material-tailwind/react";
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
          <Avatar
            variant="circular"
            size="lg"
            className=""
            src="../../../public/img/logo.png"
          />
        </Typography>
        {!user ? (
          <div className="hidden gap-2 lg:flex">
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
