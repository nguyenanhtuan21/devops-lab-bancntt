import { Component, OnInit } from '@angular/core';
import { TypeControl } from 'src/app/enumeration/type-control.enum';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss']
})
export class AddIssueComponent implements OnInit {
  typeControl = TypeControl;
  
  constructor() { }

  ngOnInit(): void {
  }

}
