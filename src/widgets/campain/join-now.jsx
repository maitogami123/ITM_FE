import { AuthContext } from "@/context/AuthContext";
import {
  getCompetitionForStaff,
  registerStaff,
} from "@/services/competitionService";
import { Button, Typography } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Toast from "../toast/toast-message";

export function JoinNow() {
  const { user } = useContext(AuthContext);
  const [competitionList, setCompetitionList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCompetitionForStaff(user.id);
        if (response.status === 200) {
          setCompetitionList(response.data);
        } else {
          throw new Error("có lỗi xảy ra trong quá trình tìm kiếm");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleRegisterUser = async (compId, userId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I'm in!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const deleteReponse = await registerStaff(compId, userId);
            if (deleteReponse.status === 200) {
              Toast.fire({
                title: "Participated!",
                text: "Joined the competition successfully.",
                icon: "success",
              });
              setCompetitionList((prev) =>
                prev.filter((item) => item._id !== compId)
              );
            }
          } catch (e) {
            Toast.fire({
              title: "Error!",
              text: "Joined the competition failed.",
              icon: "error",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="max-h-[400px] overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-md">
      <Typography
        variant="h3"
        color="blue-gray"
        className="sticky top-0 z-10 mb-2 border-b border-gray-500/25 bg-white p-4 text-center font-bold shadow-md"
      >
        Sự kiện sắp tới
      </Typography>
      <div className="space-y-6 p-4">
        {competitionList &&
          competitionList.length > 0 &&
          competitionList.map((competition) => {
            return (
              <section
                key={competition._id}
                className="rounded-xl rounded-l-xl border border-blue-gray-100 bg-[url('/img/gradient-bg-1.png')] bg-cover bg-right bg-no-repeat p-10"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-bold"
                >
                  Upcoming Events
                </Typography>
                <Typography variant="h3" color="blue-gray">
                  {competition.title}
                </Typography>
                <Typography className="mt-2 mb-6 !text-base font-normal text-gray-800">
                  {competition.description}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleRegisterUser(competition._id, user.id)}
                  className="flex-shrink-0"
                >
                  join now
                </Button>
              </section>
            );
          })}
      </div>
    </div>
  );
}
export default JoinNow;
