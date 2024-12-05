import {
  Card,
  CardBody,
  Avatar,
  IconButton,
  Typography,
} from "@material-tailwind/react";

function TeamCard({ img, name, title }) {
  return (
    <Card className="rounded-lg bg-[#FAFAFA]" shadow={false}>
      <CardBody className="text-center">
        <Avatar
          src={img}
          alt={name}
          variant="circular"
          size="xxl"
          className="mx-auto mb-6 object-top"
        />
        <Typography
          variant="h5"
          color="blue-gray"
          className="text-lg !font-medium"
        >
          {name}
        </Typography>
        <Typography
          color="blue-gray"
          className="mb-2 !text-base !font-semibold text-gray-600"
        >
          {title}
        </Typography>
        <div className="flex items-center justify-center gap-1.5">
          <IconButton variant="text" color="gray">
            <i className="fa-brands fa-twitter text-lg" />
          </IconButton>
          <IconButton variant="text" color="gray">
            <i className="fa-brands fa-linkedin text-lg" />
          </IconButton>
          <IconButton variant="text" color="gray">
            <i className="fa-brands fa-dribbble text-lg" />
          </IconButton>
        </div>
      </CardBody>
    </Card>
  );
}
const linkImg = "../../public/img/";
const members = [
  {
    img: `${linkImg}001174_tttinh.png`,
    name: "PGS. TS. Trần Trung Tính",
    title: "Hiệu trưởng",
  },
  {
    img: `${linkImg}000273_tnhai.png`,
    name: "GS. TS. Trần Ngọc Hải",
    title: "Phó Hiệu trưởng",
  },
  {
    img: `${linkImg}001349_lvlam.png`,
    name: "TS. Lê Văn Lâm",
    title: "Phó Hiệu Trưởng",
  },
  {
    img: `${linkImg}000483_nhtrung.png`,
    name: "PGS. TS. Nguyễn Hiếu Trung",
    title: "Phó Hiệu Trưởng",
  },
  {
    img: `${linkImg}000267_ntphuong.png`,
    name: "GS.TS. Nguyễn Thanh Phương",
    title: "Chủ tịch Hội đồng Trường",
  },
  {
    img: `${linkImg}001062_ncngon.png`,
    name: "PGS.TS. Nguyễn Chí Ngôn",
    title: "Web Developer",
  },
  {
    img: `${linkImg}00199_tqlap.png`,
    name: "PGS.TS. Trịnh Quốc Lập",
    title: " Trưởng Ban Đào tạo và ĐBCL Trường",
  },
  {
    img: `${linkImg}002143_lvvang.png`,
    name: "PGS.TS. Lê Văn Vàng",
    title: " Trưởng Ban Tổ chức, Nhân sự và Pháp chế",
  },
];

export function TeamSection12() {
  return (
    <section className="min-h-screen py-8 px-8 lg:py-28">
      <div className="container mx-auto">
        <div className="mb-16 text-center lg:mb-28">
          <Typography
            variant="h1"
            color="blue-gray"
            className="my-2 !text-2xl lg:!text-4xl"
          >
            Đội Ngũ Cán Bộ Giảng Viên
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto w-2/3 max-w-4xl text-base !text-gray-500"
          >
            Đào tạo nhân lực trình độ cao, nâng cao dân trí, bồi dưỡng nhân tài;
            NCKH và công nghệ tạo ra tri thức, sản phẩm mới và phục vụ cộng đồng
            đáp ứng nhu cầu phát triển kinh tế - xã hội, bảo đảm quốc phòng, an
            ninh, hội nhập quốc tế. Đào tạo người học phát triển toàn diện về
            đức, trí, thể, mỹ; có tri thức, kỹ năng, trách nhiệm nghề nghiệp; có
            khả năng nắm bắt tiến bộ khoa học và công nghệ tương xứng với trình
            độ đào tạo, khả năng tự học, sáng tạo, thích nghi với môi trường làm
            việc; có tinh thần lập nghiệp, có ý thức phục vụ nhân dân
          </Typography>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {members.map((props, key) => (
            <TeamCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection12;
