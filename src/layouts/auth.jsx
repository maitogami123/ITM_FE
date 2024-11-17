import Footer16 from "@/sections/footer";
import { Link, Outlet } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
export function AuthLayout() {
  return (
    <>
      <div className="container mx-auto">
        <div className="fixed top-4">
          <Link to={"/"}>
            <Button className="flex items-center gap-3">
              <ArrowLeftIcon className="w-[24px]" />
              Go Back
            </Button>
          </Link>
        </div>
        <div className="min-h-screen w-full">
          <Outlet />
        </div>
      </div>
      <Footer16 />
    </>
  );
}

AuthLayout.displayName = "/src/layout/Auth.jsx";

export default AuthLayout;
