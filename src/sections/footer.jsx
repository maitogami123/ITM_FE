import { Typography } from "@material-tailwind/react";
const links = ["Company", "About Us", "Team", "Products", "Blog", "Pricing"];
const currentYear = new Date().getFullYear();

export function Footer16() {
  return (
    <footer class="bg-blue-900 py-8 text-white">
      <div class="container mx-auto grid grid-cols-1 gap-6 text-sm md:grid-cols-4">
        <div class="space-y-2">
          <div class="flex items-center space-x-2">
            <img src="../../public/img/cantho.png" alt="Logo" class="h-12" />
          </div>
          <p>📍 Khu 2, Đ. 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. CT</p>
          <p>📞 ĐT: +84292 3831 530; 3838 237; 3832 663</p>
          <p>📠 Fax: +84292 3838 474</p>
          <p>✉️ dhct@ctu.edu.vn</p>
          <div class="mt-2 flex space-x-2">
            <a href="#" class="hover:opacity-80">
              <img
                src="../../public/img/facebook.png"
                alt="Facebook"
                class="h-6 w-6"
              />
            </a>
            <a href="#" class="hover:opacity-80">
              <img
                src="../../public/img/youtube.png"
                alt="YouTube"
                class="h-6 w-6"
              />
            </a>
            <a href="#" class="hover:opacity-80">
              <img
                src="../../public/img/instagram.png"
                alt="Instagram"
                class="h-6 w-6"
              />
            </a>
            <a href="#" class="hover:opacity-80">
              <img
                src="../../public/img/linkedin.png"
                alt="LinkedIn"
                class="h-6 w-6"
              />
            </a>
            <a href="#" class="hover:opacity-80">
              <img
                src="../../public/img/tiktok.png"
                alt="TikTok"
                class="h-6 w-6"
              />
            </a>
          </div>
        </div>

        <div>
          <h3 class="mb-2 font-bold">DỊCH VỤ TIỆN ÍCH</h3>
          <ul class="space-y-1">
            <li>
              <a href="#" class="hover:underline">
                📧 Thư điện tử
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                📁 Hệ thống tích hợp
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                💻 Học trực tuyến
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                📝 Thi trực tuyến
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                🏢 Văn phòng điện tử
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                📄 Văn bản
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                🆘 Trợ giúp
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                🅰️ Nhận diện thương hiệu
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-2 font-bold">THÔNG TIN</h3>
          <ul class="space-y-1">
            <li>
              <a href="#" class="hover:underline">
                ⭐ Thông tin phòng, chống COVID
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                📅 Sự kiện
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                📆 Lịch trường
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                ☎️ Các số máy đặc biệt
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                🗺️ Sơ đồ trang
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                🏛️ CTU 55 năm
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                📊 Infographic
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                📰 CTU eNewsletter
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-2 font-bold">CÔNG KHAI</h3>
          <ul class="space-y-1">
            <li>
              <a href="#" class="hover:underline">
                ⚖️ Thông tư 36
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                👥 Tuyển dụng
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                🔍 Tra cứu văn bằng
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                📌 Quy trình công tác
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                📈 Báo cáo thường niên
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                📚 Tạp chí Khoa học ĐHCT
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                📑 Đề án mở ngành
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                🤝 Phục vụ cộng đồng
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8 text-center text-xs text-white/80">
        © 2024 Đại học Cần Thơ | Lượt truy cập: 37079156
      </div>
    </footer>
  );
}
export default Footer16;
