import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-daterange',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.scss']
})
export class DaterangeComponent implements OnInit {


  @Output()
  valueChanged = new EventEmitter();

  locateConfig: any = {
    firstDay: 1,
    separator: "-",
    displayFormat: "DD/MM/YYYY"
  }

  minDate = moment().startOf("year").subtract(10, "year");
  maxDate = moment().endOf("year");

  dateRangeValue: any = {
    startDate: this.minDate,
    endDate: this.maxDate
  };

  fieldName: string = 'DateRange'

  ranges: any = {
    'All time': [this.minDate, this.maxDate],
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }

  constructor() { }

  ngOnInit(): void {
  }

  datesUpdated(data: any) {
    this.valueChanged.emit({
      FieldName: this.fieldName,
      Value: data
    });
  }

  rePositionDatePicker(datePicker: any) {
    setTimeout(() => {
      const el: HTMLElement = datePicker.getElementsByTagName("ngx-daterangepicker-material")[0].children[0];
      el.removeAttribute("style");
      el.setAttribute("style", "top: 115px; left: 15px; right: auto;")
    }, 0);
  }
}
