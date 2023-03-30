import { TypeControl } from 'src/app/enumeration/type-control.enum';
import { BaseComponent } from 'src/app/shared/base-component';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseProjectComponent } from 'src/app/base/base-project/base-project.component';

@Component({
  selector: 'app-popup-list-project',
  templateUrl: './popup-list-project.component.html',
  styleUrls: ['./popup-list-project.component.scss']
})
export class PopupListProjectComponent extends BaseComponent implements OnInit {
  typeControl = TypeControl;

  @ViewChild("projectComponent", {static: true, read: BaseProjectComponent})
  projectComponent?: BaseProjectComponent
  
  constructor(
    public dialogRef: MatDialogRef<PopupListProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
   }

  ngOnInit(): void {
  }

  searchProject(keyword: any) {
    this.projectComponent?.searchProject(keyword);
  }

  close() {
    console.log(this.dialogRef);
    this.dialogRef.close();
  }
}
