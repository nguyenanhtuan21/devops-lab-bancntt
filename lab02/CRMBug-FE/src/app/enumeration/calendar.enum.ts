import { CalendarOptions } from '@fullcalendar/core';

/**
 * Config cho full calendar
 */
export const DEFAULT_CALENDAR_OPTIONS: CalendarOptions = {
  locale: 'en',
  height: '100%',
  stickyHeaderDates: false,
  allDaySlot: false,

  headerToolbar: {
    start: 'title',
    center: '',
    end: 'today prev,next',
  },

  dayHeaders: true,

  dayHeaderFormat: {
    weekday: 'long',
    omitCommas: true,
  },

  weekText: 'Week ',

  weekNumbers: true,

  nowIndicator: true,

  titleFormat: {
    year: 'numeric',
    month: '2-digit',
  },

  slotDuration: '00:15:00',

  businessHours: {
    // days of week. an array of zero-based day of week integers (0=Sunday)
    daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday - Thursday

    startTime: '00:00', // a start time (10am in this example)
    endTime: '24:00', // an end time (6pm in this example)
  },

  slotLabelFormat: {
    hour: 'numeric',
    minute: '2-digit',
    omitZeroMinute: false,
    meridiem: 'short',
    hour12: false,
  },

  buttonText: {
    today: 'Today',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    list: 'List',
  },

  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    meridiem: false,
  },

  firstDay: 1,

  dayMaxEventRows: 3,

  editable: false,

  droppable: false,
};

export enum CalendarType {
  MonthLy = 1,
  WeekLy = 2
}
