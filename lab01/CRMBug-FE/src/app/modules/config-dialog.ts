import { DialogPosition, MatDialogConfig } from "@angular/material/dialog";

export class ConfigDialog extends MatDialogConfig {
  public data: any;
  constructor(
      width?: string,
      height?: string,
      position?: DialogPosition
    ) {
    super();
    this.panelClass = ["bt-dialog"];
    this.autoFocus = true;
    this.hasBackdrop = true;
    
    if(width) {
      this.width = width;
    }
    if(height) {
      this.height = height;
    }
    if(position) {
      this.position = position;
    }
  }
}