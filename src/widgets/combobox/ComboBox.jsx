import { useState, useEffect } from "react";
import Select from "react-select"; // Sử dụng react-select cho ComboBox
import axios from "axios";
import { getAllStaffs } from "@/services/staffService";
import { getAllRewards } from "@/services/projectService";

export function ComboBox({ label, selected, setSelected }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        let mapOptions;
        if (label.toLowerCase() === "staffs") {
          response = await getAllStaffs();
          mapOptions = (data) =>
            data.map((staff) => ({
              value: staff._id,
              label: `${staff.mscb} -- ${staff.name}`,
            }));
        } else if (label.toLowerCase() === "rewards") {
          response = await getAllRewards();
          mapOptions = (data) =>
            data.map((reward) => ({
              value: reward._id,
              label: `${reward.title} -- ${reward.date}`,
            }));
          console.log(response);
        }
        if (response && response.status === 200) {
          const { data } = response.data;
          setOptions(mapOptions(data));
        } else {
          throw new Error("Có lỗi xảy ra trong quá trình tải dữ liệu");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [label]);

  const handleChange = (selectedOptions) => {
    setSelected(selectedOptions); // Cập nhật danh sách staff đã chọn
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
        </div>
      ) : (
        <div>
          <label
            htmlFor="select"
            className="mb-2 block font-medium text-gray-700"
          >
            Select {label}
          </label>
          <Select
            id="select"
            isMulti // Kích hoạt chế độ chọn nhiều
            options={options} // Các lựa chọn staff
            value={selected} // Staff đã chọn
            onChange={handleChange} // Hàm xử lý khi chọn
            isLoading={loading} // Hiển thị trạng thái tải
            placeholder={`Choose ${label}...`}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
      )}
    </div>
  );
}
