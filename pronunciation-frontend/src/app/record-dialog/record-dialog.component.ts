import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-record-dialog',
  templateUrl: './record-dialog.component.html',
  styleUrls: ['./record-dialog.component.scss']
})
export class RecordDialogComponent implements OnInit {
  duration: number = 0;
  maxDuration: number = 5000;
  audioFile: boolean = false;

  constructor(private matDialogRef: MatDialogRef<RecordDialogComponent>, private cd: ChangeDetectorRef, private dom: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  close() {
    this.matDialogRef.close();
  }

  save() {
    this.matDialogRef.close();
  }

  recordOrPlay() {
    console.log("record or play was pushed.")
    this.audioFile = !this.audioFile;
  }
}

