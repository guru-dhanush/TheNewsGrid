import React, { useState } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/UI/Button";
import { Calendar } from "@/components/UI/Calendar/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover/popover";
import { cn } from "@/core/utils/cn";


const DateRangePicker = ({
  className = "",
  initialDateRange = {
    from: new Date(),
    to: addDays(new Date(), 7),
  },
  buttonSize = "w-[300px]",
  placeholderText = "Pick a date",
  numberOfMonths = 2,
  onDateChange,
}) => {
  const [date, setDate] = useState(initialDateRange);

  const handleDateChange = (selectedDate) => {    
    setDate(selectedDate);
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              `${buttonSize} justify-start text-left font-normal`,
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholderText}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={numberOfMonths}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
