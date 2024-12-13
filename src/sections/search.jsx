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
        navigate(`/${id}`, { state: { userData: data } });
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
            label="Nhập tên giảng viên cần tìm"
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
              <ul className="divide-y divide-gray-200">
                {tableValue.length > 0 ? (
                  tableValue.map((row, index) => (
                    <li
                      key={index}
                      className="flex cursor-pointer items-center gap-4 p-4 hover:bg-gray-100"
                      onClick={() => handleClick(row._id)}
                    >
                      {/* Avatar or Image */}
                      <img
                        src={
                          row.image || row.gender == "male"
                            ? "/img/default-man.png"
                            : "/img/default-woman.png"
                        }
                        alt={row.name}
                        className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                      />
                      {/* Information */}
                      <div className="flex flex-1 flex-col">
                        <span className="text-lg font-medium text-gray-800">
                          {row.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {row.qualificationCode && `${row.qualificationCode}`}
                          {row.user && ` - ${row.user.email}`}
                          {row.phone && ` - ${row.phone}`}
                          {row.mainSpecialization &&
                            ` - ${row.mainSpecialization}`}
                        </span>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-center text-gray-500">
                    Không tìm thấy giảng viên cần tìm
                  </li>
                )}
              </ul>
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
