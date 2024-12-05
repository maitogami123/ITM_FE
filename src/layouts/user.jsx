import Footer16 from "@/sections/footer";
import { UserNavbar } from "@/widgets/layout/user-navbar";
import { Outlet } from "react-router-dom";

export function UserLayout({ children }) {
  return (
    <div className="">
      <UserNavbar />
      <Outlet />
      <Footer16 />
    </div>
  );
}

UserLayout.displayName = "/src/layout/user.jsx";

export default UserLayout;
