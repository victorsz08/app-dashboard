"use client";

import { DateRangePicker } from "@/components/date-picker/date-range-picker";
import { subDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function DashboardPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date()
  })
  
  return (
    <section className="p-4">
     <section className="flex justify-end">
        <DateRangePicker date={date} setDate={setDate}/>
     </section>
    </section>
  );
}