import React from "react";
import { parseISO, format } from "date-fns";

const Date = ({ dateString }: { dateString: string }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "d LLLL yyyy")}</time>;
};

export default Date;
