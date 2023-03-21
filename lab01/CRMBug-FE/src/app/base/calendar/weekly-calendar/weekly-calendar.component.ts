import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { DEFAULT_CALENDAR_OPTIONS } from 'src/app/enumeration/calendar.enum';

@Component({
  selector: 'weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.scss'],
})
export class WeeklyCalendarComponent implements OnInit {

  @Output()
  eventClick = new EventEmitter();
  
  //options cho fullcalendar
  calendarOptions: CalendarOptions = {
    ...DEFAULT_CALENDAR_OPTIONS,
    initialView: 'dayGridWeek',

    allDaySlot: false, //Không cho phép hiện ô sự kiện cả ngày

    weekText: 'T',

    navLinks: true,

    dayHeaderFormat: {
      weekday: 'narrow',
      month: 'numeric',
      day: 'numeric',
      omitCommas: true,
    },

    eventDisplay: 'block',

    events: [],
    /**
     * Hàm xử lý khi bấm vào 1 event
     * @param info
     */
     eventClick: (info) => {
      console.log(info.event.extendedProps);
      this.eventClick.emit(info.event.extendedProps);
    },
  };

  @Input()
  events: Array<any> = []

  constructor() {
  }

  ngOnInit(): void {
    this.calendarOptions.events = this.events;
  }
}
