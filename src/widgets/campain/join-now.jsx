import { Button, Typography } from "@material-tailwind/react";

export function JoinNow() {
  return (
    <section className="rounded-xl rounded-l-xl border border-blue-gray-100 bg-[url('/img/gradient-bg-1.png')] bg-cover bg-right bg-no-repeat p-10">
      <Typography variant="small" color="blue-gray" className="mb-2 font-bold">
        Upcoming Events
      </Typography>
      <Typography variant="h3" color="blue-gray">
        Tech Summit: Shaping Tomorrow
      </Typography>
      <Typography className="mt-2 mb-6 !text-base font-normal text-gray-800">
        Prepare to be part of dynamic conversations that will redefine the
        boundaries.
      </Typography>
      <Button variant="outlined" className="flex-shrink-0">
        join now
      </Button>
    </section>
  );
}
export default JoinNow;
