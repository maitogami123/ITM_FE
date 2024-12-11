import { getListSalaryIncrements } from "@/services/staffService";
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

function ListSalaryTable({ currentPage, setPageData, searchText }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getListSalaryIncrements(searchText || null, currentPage);
      if (response.status === 200) {
        const { data, total, page, limit, pages } = response.data;
        setData(data);
        setPageData({ total, page, limit, pages });
      } else {
        throw new Error("An error occurred while fetching data.");
      }
    } catch (error) {
      console.error(error.message);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage,searchText]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="red" className="text-center">
        {error}
      </Typography>
    );
  }

  return (
    <table className="mt-4 w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {[
            "Mã số cán bộ",
            "Họ và tên",
            "Học vị",
            "Ngày cuối cùng tăng lương",
            "Ngày tiếp theo tăng lương",
          ].map((el) => (
            <th
              key={el}
              className="border-y border-blue-gray-100 bg-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="text-[11px] font-medium uppercase text-blue-gray-400"
              >
                {el}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((increment, key) => {
          const {
            _id,
            mscb,
            name,
            qualificationCode,
            lastIncrementDate,
            nextIncrementDate,
          } = increment;
          const isLast = key === data.length - 1;
          const rowClasses = isLast
            ? "p-4"
            : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={key}>
              <td className={rowClasses}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold"
                >
                  {mscb}
                </Typography>
              </td>
              <td className={rowClasses}>
                <Typography
                  variant="small"
                  className="text-xs font-medium text-blue-gray-600"
                >
                  {name}
                </Typography>
              </td>
              <td className={rowClasses}>
                <Typography
                  variant="small"
                  className="text-xs font-medium text-blue-gray-600"
                >
                  {qualificationCode}
                </Typography>
              </td>
              <td className={rowClasses}>
                <Typography
                  variant="small"
                  className="text-xs font-medium text-blue-gray-600"
                >
                  {lastIncrementDate}
                </Typography>
              </td>
              <td className={rowClasses}>
                <Typography
                  variant="small"
                  className="text-xs font-medium text-blue-gray-600"
                >
                  {nextIncrementDate}
                </Typography>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ListSalaryTable;
