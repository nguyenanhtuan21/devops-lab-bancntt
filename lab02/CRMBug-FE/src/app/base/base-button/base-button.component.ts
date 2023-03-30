import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'base-button',
  templateUrl: './base-button.component.html',
  styleUrls: ['./base-button.component.scss']
})
export class BaseButtonComponent implements OnInit {
  @Input()
  typeButton: string = '';

  @Input()
  text: string = '';

  @Input()
  width: number = 105;

  @Input()
  height: number = 32;
  
  @Input()
  iconCSS: string = '';

  @Input()
  iconMargin: number = 0;

  @Output()
  btnClick = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  click(e: any) {
    this.btnClick.emit(e);
  }

}
