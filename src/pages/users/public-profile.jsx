import { projectsData } from "@/data";
import { getStaffById } from "@/services/staffService";
import { ProfileInfoCard } from "@/widgets/cards";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export function PublicProfile() {
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
          const response = await getStaffById(id);
          if (response.status === 200) {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto">
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
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
                  {userData.name}
                </Typography>
                {/* <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {userData.positions[0].title}
                </Typography> */}
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <ProfileInfoCard
              title="Profile Information"
              details={{
                name: userData.name,
                mobile: userData.phone,
                "main specialization": userData.mainSpecialization,
                social: (
                  <div className="flex items-center gap-4">
                    <i className="fa-brands fa-facebook text-blue-700" />
                    <i className="fa-brands fa-twitter text-blue-400" />
                    <i className="fa-brands fa-instagram text-purple-500" />
                  </div>
                ),
              }}
            />
            <div className="col-span-2">
              <div className="px-4 pb-4">
                {/* <Typography variant="h6" color="blue-gray" className="mb-2">
                  Projects
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  Architects design houses
                </Typography> */}
                <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2">
                  {/* {projectsData.map(
                    ({ img, title, description, tag, route, members }) => (
                      <Card key={title} color="transparent" shadow={false}>
                        <CardHeader
                          floated={false}
                          color="gray"
                          className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                        >
                          <img
                            src={img}
                            alt={title}
                            className="h-full w-full object-cover"
                          />
                        </CardHeader>
                        <CardBody className="py-0 px-1">
                          <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                          >
                            {tag}
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
                          <Link to={route}>
                            <Button variant="outlined" size="sm">
                              view project
                            </Button>
                          </Link>
                          <div>
                            {members.map(({ img, name }, key) => (
                              <Tooltip key={name} content={name}>
                                <Avatar
                                  src={img}
                                  alt={name}
                                  size="xs"
                                  variant="circular"
                                  className={`cursor-pointer border-2 border-white ${
                                    key === 0 ? "" : "-ml-2.5"
                                  }`}
                                />
                              </Tooltip>
                            ))}
                          </div>
                        </CardFooter>
                      </Card>
                    )
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default PublicProfile;
