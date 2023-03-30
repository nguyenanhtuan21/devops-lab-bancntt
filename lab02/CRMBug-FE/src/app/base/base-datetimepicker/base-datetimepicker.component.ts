import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import * as moment from 'moment';
import { BaseComboboxComponent } from '../base-combobox/base-combobox.component';
@Component({
  selector: 'base-datetimepicker',
  templateUrl: './base-datetimepicker.component.html',
  styleUrls: ['./base-datetimepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseDatetimepickerComponent),
      multi: true
    }
  ]
})
export class BaseDatetimepickerComponent implements OnInit {

  public date: moment.Moment = moment();
  public showSpinners = true;
  public showSeconds = true;
  public touchUi = false;
  public enableMeridian = false;

  @Input()
  public minDate: moment.Moment = moment();
  @Input()
  public maxDate: moment.Moment= moment().add(10 , "year");

  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  @Input()
  value: any = moment();

  @Input()
  width: string = '100%';

  @Input()
  label: string = 'Due Date';

  @Input()
  labelWidth: number = 120;

  @Input()
  isShowLabel: boolean = false;

  @Input()
  fieldName: string = '';

  @Input()
  disabled: boolean = false;

  @Output()
  valueChange = new EventEmitter();
  public dateControl = new FormControl(moment());

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(obj: any) {
    this.value = obj;
    this.change(obj);
  }

  registerOnChange(fn: any) {
  }

  registerOnTouched(fn: any) {
  }

  setDisabledState(isDisabled: boolean) {
  }

  change = (data: any) => {};


  onChange() {
    const me = this;
    console.log(me.value.toDate());
    me.valueChange.emit({
      FieldName: this.fieldName,
      Value: me.value.toDate(),
      Text: me.value.toDate()
    });
  }
}
