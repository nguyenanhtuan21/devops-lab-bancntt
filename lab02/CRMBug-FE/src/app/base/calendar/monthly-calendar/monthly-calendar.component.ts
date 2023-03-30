import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { DEFAULT_CALENDAR_OPTIONS } from 'src/app/enumeration/calendar.enum';

@Component({
  selector: 'monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.scss'],
})
export class MonthlyCalendarComponent implements OnInit {

  @Output()
  eventClick = new EventEmitter();

  calendarOptions: CalendarOptions = {
    ...DEFAULT_CALENDAR_OPTIONS,

    initialView: 'dayGridMonth',

    stickyHeaderDates: false,

    selectable: true,

    navLinks: true,

    weekNumbers: true,

    eventDisplay: 'block',

    events: [
      { title: 'event 1', date: '2022-07-01' },
      { title: 'event 2', date: '2022-07-02' },
    ],
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
  events: Array<any> = [];

  constructor() {
    
  }

  ngOnInit(): void {
    this.calendarOptions.events = this.events;
  }
}
