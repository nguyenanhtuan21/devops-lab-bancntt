import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.scss']
})
export class PopupConfirmComponent implements OnInit {
  title: string = '';

  content: string = '';

  constructor(
    public dialogRef: MatDialogRef<PopupConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if(this.data) {
      this.title = this.data["title"];
      this.content = this.data["content"];
    }
  }

  accept() {
    this.dialogRef.close(true);
  }
  /**
   * Đóng popup
   */
   close() {
    this.dialogRef.close(false);
  }
}
