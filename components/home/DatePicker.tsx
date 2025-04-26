"use client"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from '../ui/button';
'use client';

function DatePicker() {
    const [startDate, setStartDate] = useState<Date | null>(null);
      const [endDate, setEndDate] = useState<Date | null>(null);
  return (
    <div>
        <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-start justify-start flex-col h-auto px-2"
          >
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <CalendarIcon className="w-4 h-4" />
              Check in – check out
            </div>
            <div className="text-black text-sm font-medium">
              {startDate && endDate
                ? `${startDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                  })} - ${endDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                  })}`
                : '04 Jan–04 Feb'}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4">
          <DatePicker
            selected={startDate}
            onChange={(dates: [Date, Date]) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePicker
