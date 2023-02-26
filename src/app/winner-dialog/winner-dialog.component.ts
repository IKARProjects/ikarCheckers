import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-winner-dialog",
  templateUrl: "./winner-dialog.component.html",
  styleUrls: ["./winner-dialog.component.scss"],
})
export class WinnerDialogComponent implements OnInit {
  playerName:string|undefined
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<WinnerDialogComponent>
  ) {this.playerName=data}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
