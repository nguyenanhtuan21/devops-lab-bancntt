import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';

@Component({
  selector: 'base-combobox',
  templateUrl: './base-combobox.component.html',
  styleUrls: ['./base-combobox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseComboboxComponent),
      multi: true
    }
  ]
})
export class BaseComboboxComponent implements OnInit, ControlValueAccessor {
  @Input()
  datas: any[] = [];
  
  @Input()
  value: any;

  @Input()
  isShowLabel: boolean = false;

  @Input()
  labelText: string = "";

  @Input()
  labelWidth: number = 120;

  @Input()
  fieldName: string = "";

  @Input()
  width: string = '100%';

  @Input()
  disabled: boolean = false;

  @Input()
  isHorizontal: boolean = true;

  @Input()
  isMultiple: boolean = false;

  @Output()
  valueChange = new EventEmitter();
  change = (data: any) => {};
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

  onChange() {
    const me = this;
    if(this.isMultiple) {
      let texts = me.datas.filter((x: any) => me.value.includes(x.Value)).map((text:any) => text.Text)
      me.valueChange.emit({
        Value: me.value,
        Text: texts,
        FieldName: me.fieldName
      });
    } else {
      const data = me.datas.filter(x => x.Value == me.value )[0];
      if(data) {
        me.valueChange.emit({
          Value: data.Value,
          Text: data.Text,
          FieldName: me.fieldName
        });
      }
    }
  }
}
