import { TypeControl } from './../../enumeration/type-control.enum';
import { Component, forwardRef, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'base-textbox',
  templateUrl: './base-textbox.component.html',
  styleUrls: ['./base-textbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseTextboxComponent),
      multi: true
    }
  ]
})
export class BaseTextboxComponent implements OnInit, ControlValueAccessor  {
  @Input()
  type: number = TypeControl.Search;

  @Input()
  placeholder:string = 'Search an issue';

  @Input()
  text: string = '';

  @Input() 
  value: string = "";

  @Input()
  titleWidth: number = 150;

  @Input()
  isLabel: boolean = true;

  @Input()
  required: boolean = false;

  @Input()
  isHorizontal: boolean = true;

  @Input()
  maxLength: number = 255;

  @Input()
  borderRadius: string = '20px';

  @Output()
  valueChange = new EventEmitter();

  @Output()
  searchEvent = new EventEmitter();

  typeControl = TypeControl;
  change = (data: any) => {};
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  writeValue(obj: any) {
    this.value = obj;
    this.change(this.value);
  }

  registerOnChange(fn: any) {
  }

  registerOnTouched(fn: any) {
  }

  setDisabledState(isDisabled: boolean) {
  }

  onInput() {
    this.valueChange.emit(this.value);
  }

  search() {
    this.searchEvent.emit(
      this.value
    )
  }
}
