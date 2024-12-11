import { getUserById } from "@/services/userService";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";

export function CreateUserDialog({ open, handleOpen, id }) {
  const [passwordShown, setPasswordShown] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await registerService(data.username, data.password);
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "You can now use your newly created account to login!",
          confirmButtonText: "Ok",
        }).then((result) => {
          navigate("/sign-in");
        });
      } else {
        throw new Error("Register failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  return (
    <Dialog
      size="lg"
      open={open}
      handler={handleOpen}
      className="max-h-[70vh] overflow-auto p-4"
    >
      {/* Header */}
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          Thêm giảng viên
        </Typography>
        <Typography className="mt-1 font-normal text-gray-600">
          Nhập thông tin giảng viên
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={handleOpen}
        >
          <XMarkIcon className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>

      {/* Body */}
      <DialogBody className="space-y-4 pb-6">
        {loading ? (
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-[24rem] text-left"
          >
            <div className="mb-6">
              <label htmlFor="email">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Username
                </Typography>
              </label>
              <Input
                id="username"
                type="text"
                color="gray"
                size="lg"
                name="username"
                placeholder="name@mail.com"
                className={`w-full border-t-blue-gray-200 placeholder:opacity-100 ${
                  errors.username
                    ? "focus:border-t-red-600"
                    : "focus:border-t-gray-900"
                }`}
                labelProps={{
                  className: "hidden",
                }}
                {...register("username", { required: true })}
                error={errors.username ? true : false}
              />
              {errors.username && (
                <Typography variant="small" color="red">
                  Username is required
                </Typography>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="password">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Password
                </Typography>
              </label>
              <Input
                size="lg"
                placeholder="********"
                labelProps={{
                  className: "hidden",
                }}
                className={`w-full border-t-blue-gray-200 placeholder:opacity-100 focus:${
                  errors.password ? "border-t-red-600" : "border-t-gray-900"
                }`}
                type={passwordShown ? "text" : "password"}
                error={errors.password ? true : false}
                {...register("password", { required: true })}
                icon={
                  <i onClick={() => setPasswordShown((curr) => !curr)}>
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </i>
                }
              />
              {errors.password && (
                <Typography variant="small" color="red">
                  Password is required
                </Typography>
              )}
            </div>
            <Button
              color="gray"
              size="lg"
              className="mt-6"
              fullWidth
              type="submit"
            >
              sign up
            </Button>
            <Button
              variant="outlined"
              size="lg"
              className="mt-6 flex h-12 items-center justify-center gap-2"
              fullWidth
            >
              <img
                src={`https://www.material-tailwind.com/logos/logo-google.png`}
                alt="google"
                className="h-6 w-6"
              />
              sign up with google
            </Button>
            <Typography
              variant="small"
              color="gray"
              className="!mt-4 text-center font-normal"
            >
              Already have an account?{" "}
              <Link to={"/sign-in"} className="font-medium text-gray-900">
                Log in
              </Link>
            </Typography>
          </form>
        )}
      </DialogBody>

      {/* Footer */}
      <DialogFooter>
        <Button className="ml-auto" onClick={handleOpen}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
