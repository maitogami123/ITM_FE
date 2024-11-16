import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getAllStaffs, getStaffById } from "@/services/staffService";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";

export function SearchPage() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [tableValue, setTableValue] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const handler = debounce((value) => {
      setDebouncedValue(value);
    }, 300);

    handler(searchValue);

    return () => handler.cancel(); // Cleanup debounce
  }, [searchValue]);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedValue) {
        try {
          const response = await getAllStaffs(debouncedValue);
          if (response.status === 200) {
            setTableValue(response.data.data);
          } else {
            throw new Error("có lỗi xảy ra trong quá trình tìm kiếm");
          }
        } catch (error) {
          console.log("search error: " + error);
        }
      }
    };
    fetchData();
  }, [debouncedValue]);

  const [loading, setLoading] = useState(false);

  const handleClick = async (id) => {
    setLoading(true);
    try {
      const response = await getStaffById(id);
      if ((response.status = 200)) {
        const data = await response.data;
        console.log("User Data:", data);
        navigate(`/profile/${id}`, { state: { userData: data } });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 flex w-full flex-col items-center">
      <div className="flex w-full max-w-3xl flex-col gap-4 md:flex-row md:items-center">
        {/* Input Field */}
        <div className="relative w-full">
          <Input
            className="search_Value w-full"
            color="gray"
            label="Nhập tên giáo viên cần tìm"
            size="lg"
            value={searchValue}
            onChange={(e) => {
              const value = e.target.value;
              setSearchValue(value);
              if (value === "") {
                setTableValue([]);
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() =>
              setTimeout(() => {
                setIsFocused(false);
              }, 200)
            }
          />
          {isFocused && (
            <div className="absolute z-10 mt-2 max-h-64 w-full overflow-y-auto rounded border border-gray-300 bg-white shadow-lg">
              <table className="w-full border-collapse text-left">
                <tbody>
                  {tableValue.length > 0 ? (
                    tableValue.map((row, index) => (
                      <tr
                        key={index}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        {/* <td className="border-b p-2">{row.id}</td> */}
                        <td
                          className="border-b p-2"
                          onClick={() => handleClick(row._id)}
                        >
                          {row.name}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border-b p-2 text-center" colSpan={1}>
                        Không tìm thấy giảng viên cần tìm
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Search Button */}
        <Button color="gray" className="w-full px-4 py-2 md:ml-4 md:w-auto">
          Tìm kiếm giảng viên
        </Button>
      </div>
    </div>
  );
}
