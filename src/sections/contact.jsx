import React from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";

export function ContactSection14() {
  return (
    <>
      <footer className="bg-blue-900 py-8 text-white">
        <div className="container mx-auto grid grid-cols-1 gap-6 text-sm md:grid-cols-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <img src="logo.png" alt="Logo" className="h-12" />
              <div>
                <p className="text-lg font-bold">ĐẠI HỌC CẦN THƠ</p>
                <p>Can Tho University</p>
              </div>
            </div>
            <p>📍 Khu 2, Đ. 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. CT</p>
            <p>📞 ĐT: +84292 3831 530; 3838 237; 3832 663</p>
            <p>📠 Fax: +84292 3838 474</p>
            <p>✉️ dhct@ctu.edu.vn</p>
            <div className="mt-2 flex space-x-2">
              <a href="#" className="hover:opacity-80">
                <img src="facebook.png" alt="Facebook" className="h-6 w-6" />
              </a>
              <a href="#" className="hover:opacity-80">
                <img src="youtube.png" alt="YouTube" className="h-6 w-6" />
              </a>
              <a href="#" className="hover:opacity-80">
                <img src="instagram.png" alt="Instagram" className="h-6 w-6" />
              </a>
              <a href="#" className="hover:opacity-80">
                <img src="linkedin.png" alt="LinkedIn" className="h-6 w-6" />
              </a>
              <a href="#" className="hover:opacity-80">
                <img src="tiktok.png" alt="TikTok" className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-bold">DỊCH VỤ TIỆN ÍCH</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  📧 Thư điện tử
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  📁 Hệ thống tích hợp
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  💻 Học trực tuyến
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  📝 Thi trực tuyến
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  🏢 Văn phòng điện tử
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  📄 Văn bản
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  🆘 Trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  🅰️ Nhận diện thương hiệu
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-bold">THÔNG TIN</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  ⭐ Thông tin phòng, chống COVID
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  📅 Sự kiện
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  📆 Lịch trường
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  ☎️ Các số máy đặc biệt
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  🗺️ Sơ đồ trang
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  🏛️ CTU 55 năm
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  📊 Infographic
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  📰 CTU eNewsletter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-bold">CÔNG KHAI</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  ⚖️ Thông tư 36
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  👥 Tuyển dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  🔍 Tra cứu văn bằng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  📌 Quy trình công tác
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  📈 Báo cáo thường niên
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  📚 Tạp chí Khoa học ĐHCT
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  📑 Đề án mở ngành
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  🤝 Phục vụ cộng đồng
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-white/80">
          © 2024 Đại học Cần Thơ
        </div>
      </footer>
    </>
  );
}

export default ContactSection14;
