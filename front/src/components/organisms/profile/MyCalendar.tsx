import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type MyCalendarProps = {
  singingDayData: Date[];
};

const MyCalendar = (props: MyCalendarProps) => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Calendar
        className="bg-white text-black"
        value={value}
        onChange={onChange}
        tileClassName={'relative'}
        tileContent={({ date }) => {
          return props.singingDayData.map(item => {
            return new Date(item).toDateString() === date.toDateString() ? (
              <div
                key={`singing-${date}`}
                className="absolute inset-0 flex justify-center items-center"
              >
                <div className="w-8 h-8 bg-purple-500/60 rounded-full"></div>
              </div>
            ) : null;
          });
        }}
      />
    </div>
  );
};

export default MyCalendar;
