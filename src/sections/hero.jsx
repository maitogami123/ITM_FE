import { Button, Input, Typography } from "@material-tailwind/react";
import React from "react";

function NavItem({ children }) {
  return (
    <li>
      <Typography
        as="a"
        href="#"
        variant="paragraph"
        color="blue-gray"
        className="flex items-center gap-2 font-medium text-blue-gray-700"
      >
        {children}
      </Typography>
    </li>
  );
}

function HeroSection16() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <>
      <header className="bg-white p-8">
        <div className="mt-16 grid">
          <div className="container mx-auto px-4 text-center">
            {/* <Typography className="text-primary inline-flex rounded-lg border-[1.5px] border-blue-gray-50 bg-white py-1 px-1 text-xs font-medium lg:px-4">
              Exciting News! Introducing our latest innovation
            </Typography> */}
            <Typography
              variant="h1"
              color="blue-gray"
              className="mx-auto my-6 w-full !text-2xl leading-snug lg:max-w-3xl lg:!text-4xl"
            >
              Đồng thuận -
              <span className="leading-snug text-green-500 "> Tận tâm</span>-
              <span className="leading-snug text-green-500"> Chuẩn mực </span>-
              <span className="leading-snug text-blue-500"> Sáng tạo</span>
            </Typography>
            <Typography
              variant="lead"
              className="mx-auto w-3/5 text-base !text-gray-500 lg:text-lg"
            >
              Trường Đại học Cần Thơ có vai trò quan trọng trong đào tạo đa
              ngành, đa lĩnh vực, cung cấp nguồn nhân lực cho thành phố Cần Thơ
              cũng như vùng đồng bằng sông Cửu Long.
            </Typography>
            <div className="mt-8 grid w-full place-items-start md:justify-center">
              <div className="mb-2 flex w-full flex-col gap-4 md:flex-row">
                <Input
                  color="gray"
                  label="Nhập tên giáo viên cẩn tìm"
                  size="lg"
                />
                <Button color="gray" className="w-full px-4 md:w-[10rem]">
                  Tìm kiếm giảng viên
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default HeroSection16;
