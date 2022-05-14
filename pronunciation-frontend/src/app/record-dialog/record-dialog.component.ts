import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from "@angular/platform-browser";

declare const MediaRecorder: any;

@Component({
  selector: 'app-record-dialog',
  templateUrl: './record-dialog.component.html',
  styleUrls: ['./record-dialog.component.scss']
})
export class RecordDialogComponent implements OnInit {
  public duration: number = 0;
  public maxDuration: number = 5000;
  public audioFile: boolean = false;
  public mediaRecorder: any;
  public chunks:any[] = [];
  public audioFiles:any[] = [];

  constructor(private matDialogRef: MatDialogRef<RecordDialogComponent>, private cd: ChangeDetectorRef, private dom: DomSanitizer) {
  }

  ngOnInit(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(
        {audio: true}
      ).then(stream => {
        console.log(stream);
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.onstop = (event: any) => {
          console.log(event);
          const blob = new Blob(this.chunks, {type: 'audio/ogg; codecs=opus'});
          this.chunks = [];
          const audioUrl = URL.createObjectURL(blob);
          this.audioFiles.push(this.dom.bypassSecurityTrustUrl(audioUrl));
          console.log(audioUrl);
          this.cd.detectChanges();
        };

        this.mediaRecorder.ondataavailable = (event: { data: any; }) => {
          console.log(event);
          this.chunks.push(event.data);
        }
      })
        .catch(err => console.log(err));
    } else {
      console.log("there are no mediaDevices.");
    }
  }

  close() {
    this.matDialogRef.close();
  }

  save() {
    this.matDialogRef.close();
  }

  recordAndStop() {
    this.audioFile = !this.audioFile;
    if(this.audioFile) {
      this.audioFiles = [];
      console.log('start recording');
      this.mediaRecorder.start();
      // TODO increment the duration until max duration of 5 seconds the auto-stop recording
    } else {
      console.log('stop recording');
      this.mediaRecorder.stop();
    }
  }
}

