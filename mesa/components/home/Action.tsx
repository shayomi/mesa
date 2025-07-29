import React from "react";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";

const Action = () => {
  return (
    <section className="">
      <div className=" flex flex-col items-center text-center px-12">
        <Typography variant="h1" className="font-bold">
          Ready to Expand?
        </Typography>
        <Typography variant="p" className="font-semibold">
          Login or signup to get started
        </Typography>
        <Button size="lg" variant="default" className="mt-4">
          {" "}
          Start building your market strategy today
        </Button>
      </div>
    </section>
  );
};

export default Action;
