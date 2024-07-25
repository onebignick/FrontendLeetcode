"use client"
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './styles.css';


export interface SubmissionRecord {
  date: Date;
  count: number;
}

export interface UserSubmissionHeatMapProps {
  submissionRecords: SubmissionRecord[];
}

const UserSubmissionHeatMap: React.FC<UserSubmissionHeatMapProps> = ({submissionRecords}) => {

  const today = new Date();

  const shiftDate = (date: Date, numDays: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  };

  return (
    <div className='flex flex-col gap-y-3'>
      <h1 className='text-xl md:text-2xl font-semibold'>Submissions in the last 6 months</h1>
      <CalendarHeatmap
        startDate={shiftDate(today, -150)}
        endDate={today}
        values={submissionRecords}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={(value: any) => {
          return {
            'data-tip': `${value.toString().slice(0, 10)} has count: ${value.count}`
          };
        }}
        showWeekdayLabels={true}
      />
    </div>
  );
};

export default UserSubmissionHeatMap;
