import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent implements OnInit {

  @Input()
  width: string = '100%';

  @Input()
  height: string = '100%';

  constructor() { }

  ngOnInit(): void {
  }

}
