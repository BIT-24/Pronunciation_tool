import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-record-dialog',
  templateUrl: './record-dialog.component.html',
  styleUrls: ['./record-dialog.component.scss']
})
export class RecordDialogComponent implements OnInit {
  public duration: number = 0;
  public audioFile: boolean = false;
  public mediaRecorder: any;
  public chunks:any[] = [];
  public audioFiles:any[] = [];
  file: File | undefined;

  constructor(private matDialogRef: MatDialogRef<RecordDialogComponent>,
              private cd: ChangeDetectorRef, private dom: DomSanitizer) {
  }

  ngOnInit(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(
        {audio: true}
      ).then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.onstop = (event: any) => {
          const blob = new Blob(this.chunks, {type: 'audio/webm; codecs=opus'});
          this.chunks = [];
          const audioUrl = URL.createObjectURL(blob);
          this.audioFiles.push(this.dom.bypassSecurityTrustUrl(audioUrl));
          this.cd.detectChanges();
          this.file = new File([blob], "testing", {type: 'mp3'})
        };

        this.mediaRecorder.ondataavailable = (event: { data: any; }) => {
          this.chunks.push(event.data);
        }
      })
        .catch(err => console.log(err));
    } else {
    }
  }

  close() {
    this.matDialogRef.close();
  }

  save() {
    this.matDialogRef.close({
      audioUrl: this.audioFiles[0],
      audioFile: this.file
    });
  }

  recordAndStop() {
    this.audioFile = !this.audioFile;
    if(this.audioFile) {
      this.audioFiles = [];
      this.mediaRecorder.start();
    } else {
      this.mediaRecorder.stop();
    }
  }
}

