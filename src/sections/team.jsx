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
    img: `${linkImg}DTNGHI.jpg`,
    name: "PGS.TS. Đỗ Thanh Nghị",
    title: "Chủ tịch Hội đồng",
  },
  {
    img: `${linkImg}NHHOA.jpg`,
    name: "TS. Nguyễn Hữu Hòa",
    title: "Ủy viên ",
  },
  {
    img: `${linkImg}PNguyenKhang.jpg`,
    name: "PGS.TS. Phạm Nguyên Khang",
    title: "Ủy viên",
  },
  {
    img: `${linkImg}NBHUNG.jpg`,
    name: "TS. Ngô Bá Hùng",
    title: "Ủy viên",
  },
  {
    img: `${linkImg}HXHIEP.jpg`,
    name: "PGS.TS. Huỳnh Xuân Hiệp",
    title: "Ủy viên",
  },
  {
    img: `${linkImg}NTNGHE.jpg`,
    name: "PGS.TS. Nguyễn Thái Nghe",
    title: "Ủy viên",
  },
  {
    img: `${linkImg}TNMTHU.jpg`,
    name: "TS. Trần Nguyễn Minh Thư",
    title: "Ủy viên",
  },
  {
    img: `${linkImg}TMTHAI.jpg`,
    name: "TS. Trương Minh Thái",
    title: "Ủy viên",
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
