import UserProfileForm from "@/components/user/user-form";
import { projectsData } from "@/data";
import { getUserById } from "@/services/userService";
import JoinNow from "@/widgets/campain/join-now";
import { ProfileInfoCard } from "@/widgets/cards";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Spinner,
  Textarea,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export function UserProfile() {
  const { id } = useParams(); // Lấy id từ URL
  const location = useLocation(); // Lấy state từ điều hướng
  const [userData, setUserData] = useState(location.state?.userData || null); // Dữ liệu truyền từ SearchPage
  const [loading, setLoading] = useState(!userData); // Nếu có dữ liệu ban đầu thì không cần loading
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userData) {
      // Nếu không có dữ liệu, gọi API để lấy dữ liệu
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await getUserById(id);
          if (response.status === 200) {
            console.log(response.data);
            setUserData(response.data);
          } else {
            throw new Error("Failed to fetch user data");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id, userData]);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        {" "}
        <Spinner />{" "}
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto">
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="gird-cols-1 mb-12 grid gap-12 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <div className="mb-10 flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Avatar
                    src="/img/bruce-mars.jpeg"
                    alt="bruce-mars"
                    size="xl"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {(userData.staff && userData.staff.name) ||
                        userData.username}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      {userData.staff &&
                        userData.staff.positions[0] &&
                        userData.staff.positions[0].title}
                    </Typography>
                  </div>
                </div>
              </div>
              <ProfileInfoCard
                title="Profile Information"
                description={`${userData.description || ""}`}
                details={{
                  "full name": (userData.staff && userData.staff.name) || "",
                  mobile: (userData.staff && userData.staff.phone) || "",
                  email: userData.email,
                  "expected salary increment date": userData.nextIncrementDate,
                }}
              />
            </div>
            {userData.staff && <div className="col-span-2">
              <div className="mb-4 grid gap-y-10 ">
                <JoinNow />
              </div>
              <UserProfileForm user={userData} />
            </div>}
          </div>
          {userData.staff && userData.staff.rewards && userData.staff.rewards.length > 0 && (
            <div className="px-4 pb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Rewards
              </Typography>
              <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                {userData.staff.rewards.map(
                  ({ title, description, years, _id }) => (
                    <Card key={_id} color="transparent" shadow={false}>
                      <CardHeader
                        floated={false}
                        color="gray"
                        className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                      >
                        <img
                          src={"/img/home-decor-1.jpeg"}
                          alt={title}
                          className="h-full w-full object-cover"
                        />
                      </CardHeader>
                      <CardBody className="py-0 px-1">
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          {years}
                        </Typography>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mt-1 mb-2"
                        >
                          {title}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          {description}
                        </Typography>
                      </CardBody>
                    </Card>
                  )
                )}
              </div>
            </div>
          )}
          {userData.staff && userData.staff.competitions &&
            userData.staff.competitions.length > 0 && (
              <div className="px-4 pb-4">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Competitions
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  Participated competitions
                </Typography>
                <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                  {userData.staff.competitions.map(
                    ({ title, description, years, _id, staffs }) => (
                      <Card key={_id} color="transparent" shadow={false}>
                        <CardHeader
                          floated={false}
                          color="gray"
                          className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                        >
                          <img
                            src={"/img/home-decor-1.jpeg"}
                            alt={title}
                            className="h-full w-full object-cover"
                          />
                        </CardHeader>
                        <CardBody className="py-0 px-1">
                          <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                          >
                            {years}
                          </Typography>
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="mt-1 mb-2"
                          >
                            {title}
                          </Typography>
                          <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                          >
                            {description}
                          </Typography>
                        </CardBody>
                        <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                          <Tooltip content={"Thanh"}>
                            <Avatar
                              src={"/img/team-1.jpeg"}
                              alt={"Thanh"}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white`}
                            />
                          </Tooltip>
                        </CardFooter>
                      </Card>
                    )
                  )}
                </div>
              </div>
            )}
        </CardBody>
      </Card>
    </div>
  );
}

export default UserProfile;
