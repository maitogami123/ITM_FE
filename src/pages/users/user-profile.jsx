import UserProfileForm from "@/components/user/user-form";
import { uploadAvatarImage } from "@/services/staffService";
import { getUserById } from "@/services/userService";
import { API_BASE } from "@/utils/constant";
import JoinNow from "@/widgets/campain/join-now";
import { ProfileInfoCard } from "@/widgets/cards";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
export function UserProfile() {
  const { id } = useParams(); // Lấy ID từ URL
  const location = useLocation(); // Lấy state từ điều hướng
  const [userData, setUserData] = useState(location.state?.userData || null);
  const [loading, setLoading] = useState(!userData);
  const [error, setError] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null); // Trạng thái ảnh mới
  const [isUploading, setIsUploading] = useState(false); // Trạng thái đang upload ảnh

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getUserById(id);
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
  useEffect(() => {
    if (!userData) {
      fetchData();
    }
  }, [id, userData, newAvatar]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(file);
    }
  };

  const handleUpload = async () => {
    if (!newAvatar) return;
    setIsUploading(true);
    try {
      const response = await uploadAvatarImage({
        id: userData?.staff?._id,
        file: newAvatar,
        mscb: userData?.staff?.mscb,
        name: userData?.staff?.name,
      });
      if (response.status === 200) {
        setUserData((prev) => ({
          ...prev,
          avatar: response.data.imagePath, // Cập nhật đường dẫn avatar
        }));
        setNewAvatar(null);
        Swal.fire({
          icon: "success",
          title: "Update Avatar",
          text: "Your avatar has been updated successfully!",
          confirmButtonText: "Ok",
          confirmButtonColor: "Green",
        });
        window.location.reload();
      } else {
        throw new Error("Failed to upload avatar");
      }
    } catch (err) {
      console.error("Lỗi khi upload ảnh:", err.message);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          "There was an error updating your avatar. Please try again.\n " +
          err.message,
        confirmButtonText: "Close",
        confirmButtonColor: "Red",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        {" "}
        <Spinner />{" "}
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  console.log("=====UserData=====");
  console.log(userData);
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
                  <div className="group relative">
                    {/* Avatar: Hiển thị ảnh xem trước nếu có */}
                    <Avatar
                      src={
                        newAvatar
                          ? URL.createObjectURL(newAvatar)
                          : userData.staff?.image
                          ? `${API_BASE + userData.staff.image}`
                          : userData.staff?.gender == "male"
                          ? "/img/default-man.png"
                          : "/img/default-woman.png"
                      }
                      alt={userData.staff?.name || "User"}
                      size="xl"
                      className="rounded-full shadow-lg shadow-blue-gray-500/40"
                    />
                    {/* Icon chỉnh sửa */}
                    <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white opacity-50 transition-opacity duration-300 hover:bg-blue-600 group-hover:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L7.5 20.5H4v-3.5L16.732 3.732z"
                        />
                      </svg>
                    </div>
                    {/* Input chọn file ảnh */}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
                      onChange={handleFileChange}
                    />
                  </div>

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
                {newAvatar && (
                  <div className="mt-4 flex items-center gap-4">
                    <Button
                      color="green"
                      onClick={handleUpload}
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Confirm Upload"}
                    </Button>
                    <Button color="red" onClick={() => setNewAvatar(null)}>
                      Cancel
                    </Button>
                  </div>
                )}
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
            {userData.staff && (
              <div className="col-span-2">
                <div className="mb-4 grid gap-y-10 ">
                  <JoinNow />
                </div>
                <UserProfileForm user={userData} />
              </div>
            )}
          </div>
          {userData.staff &&
            userData.staff.rewards &&
            userData.staff.rewards.length > 0 && (
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
          {userData.staff &&
            userData.staff.competitions &&
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
