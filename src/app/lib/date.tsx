// This script is responsible for reformating the date for the blog search pages and such
import { parseISO, format } from "date-fns";

export default function Date({ dateString }: { dateString: string }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "d LLLL yyyy")}</time>;
}
