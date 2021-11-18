import { format } from "date-fns";

export function getFormattedDateRange(startDate: Date, endDate: Date | "Today"){
  const dateFormat = 'MMM yyyy'
  const formattedEndDate = endDate === 'Today' ? 'Today' : format(endDate,dateFormat)
  return `${format(startDate,dateFormat)} – ${formattedEndDate}`
}
