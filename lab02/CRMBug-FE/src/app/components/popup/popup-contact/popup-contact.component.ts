import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-contact',
  templateUrl: './popup-contact.component.html',
  styleUrls: ['./popup-contact.component.scss']
})
export class PopupContactComponent implements OnInit {

  firstCharacter: string = '';

  qrdata = 'tel:0866422499';

  title: string = 'Scan QR code save contact'

  width: number = 130;

  phoneNumber?: string;

  email?: string;

  fullName: string = '';

  constructor(
    public dialogRef: MatDialogRef<PopupContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    if(this.data) {
      this.qrdata = this.data["qrData"];
      this.title = this.data["title"];
      this.fullName = this.data["fullName"];
      this.firstCharacter = this.data["lastName"].charAt(0).toUpperCase();
      this.email = this.data["email"];
      this.phoneNumber = this.data["phoneNumber"];
      if(this.data["width"]) {
        this.width = Number(this.data["width"]);
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
