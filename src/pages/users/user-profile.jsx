import { projectsData } from "@/data";
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
import { Link } from "react-router-dom";

export function UserProfile() {
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
                  Richard Davis
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  CEO / Co-Founder
                </Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <ProfileInfoCard
              title="Profile Information"
              description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              details={{
                "first name": "Alec M. Thompson",
                mobile: "(44) 123 1234 123",
                email: "alecthompson@mail.com",
                location: "USA",
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
              <Typography variant="h5" color="blue-gray">
                Basic Information
              </Typography>
              <Typography
                variant="small"
                className="mt-1 font-normal text-gray-600"
              >
                Update your profile information below.
              </Typography>
              <div className="mt-8 flex flex-col">
                <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      First Name
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Emma"
                      labelProps={{
                        className: "hidden",
                      }}
                      className="focus:border-t-primary w-full border-t-blue-gray-200 placeholder:opacity-100"
                    />
                  </div>
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Last Name
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Roberts"
                      labelProps={{
                        className: "hidden",
                      }}
                      className="focus:border-t-primary w-full border-t-blue-gray-200 placeholder:opacity-100"
                    />
                  </div>
                </div>
                <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Email
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="emma@mail.com"
                      labelProps={{
                        className: "hidden",
                      }}
                      className="focus:border-t-primary w-full border-t-blue-gray-200 placeholder:opacity-100"
                    />
                  </div>
                </div>
                <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Location
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Florida, USA"
                      labelProps={{
                        className: "hidden",
                      }}
                      className="focus:border-t-primary w-full border-t-blue-gray-200 placeholder:opacity-100"
                    />
                  </div>
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Phone Number
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="+123 0123 456 789"
                      labelProps={{
                        className: "hidden",
                      }}
                      className="focus:border-t-primary w-full border-t-blue-gray-200 placeholder:opacity-100"
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-end">
                <Button color="green">Save</Button>
              </div>
            </div>
          </div>
          <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Projects
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              Architects design houses
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {projectsData.map(
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
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default UserProfile;
