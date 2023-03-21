import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { CalendarType } from 'src/app/enumeration/calendar.enum';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarType = CalendarType;

  @Input()
  type: CalendarType = CalendarType.WeekLy;

  @Input()
  events: Array<any> = [
    { title: 'event 1', date: new Date(), allDay: true },
    { title: 'event 2', date: '2022-06-02', allDay: true },
  ]

  @Output()
  eventClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.events);
  }

  clickEvent(e: any) {
    this.eventClick.emit(e);
  }

}
