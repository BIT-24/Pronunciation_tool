import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RecordDialogComponent} from "../record-dialog/record-dialog.component";
import {User} from "./user";
import {USER_DATA} from "../data";
import {PronunciationService} from "./pronunciation.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  audio: any;
  user: User[] = USER_DATA;
  selectedUser: User = this.user[0]
  audioBlobUrl: BlobEvent | undefined;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  audioFile: any;

  constructor(public dialog: MatDialog,
              private audioService: PronunciationService,
              private dom: DomSanitizer) {
    this.voices = [];
    this.selectedVoice = null;
  }

  ngOnInit() {
    this.isRecorded()

    this.voices = speechSynthesis.getVoices();
    this.selectedVoice = (this.voices[0] || null);

    if (!this.voices.length) {
      speechSynthesis.addEventListener(
        "voiceschanged",
        () => {
          this.voices = speechSynthesis.getVoices();
          this.selectedVoice = (this.voices[0] || null);
        }
      );
    }
  }

  defaultPronunciation() {
    this.audioService
      .getStandardAudio(this.selectedUser.firstName, this.selectedUser.lastName)
      .subscribe(data => {
        let urlBlob = URL.createObjectURL(data);
        this.audio = this.dom.bypassSecurityTrustUrl(urlBlob);
      });
  }

  userSelected(firstName: string) {
    this.selectedUser = this.user.filter(user => user.firstName === firstName)[0];
  }

  openRecordDialog() {
    let recordDialog = this.dialog.open(RecordDialogComponent,
      {
        height: '250px',
        width: '250px',
        disableClose: true
      });

    recordDialog.afterClosed().subscribe(data => {
      this.audioBlobUrl = data.audioUrl;
      this.audioFile = data.audioFile;
      const formData = new FormData();
      formData.append('file', this.audioFile);
      formData.append('userName', this.selectedUser.id + this.selectedUser.firstName + this.selectedUser.lastName);
      this.audioService.addNonStandardAudio(formData).subscribe(data =>{
      })
      let userIndex = this.user.findIndex(user => user.id === this.selectedUser.id);
      this.user[userIndex].recorded = true;
    });

  }

  speakPreferredPronunciation(firstName: string, lastName: string, voiceName: string){
    this.synthesizeSpeechFromText(1, `${firstName} ${lastName}`, voiceName);
  }

  private synthesizeSpeechFromText(
    rate: number,
    text: string,
    voiceName: string
  ): void {

    let speechSynthesisVoice = this.voices.filter(voice => voice.name === voiceName)[0];

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesisVoice ? speechSynthesisVoice : this.selectedVoice;
    utterance.rate = rate;
    speechSynthesis.speak(utterance);
  }

  isRecorded(){
    this.user.forEach(user => {
      this.audioService.getNonStandardAudio(user.id, user.firstName, user.lastName).subscribe( res => {
        if(res){
          user.recorded = true;
        }
        }
      )
    })
  }

  customRecordedPronunciation() {
    this.audioService
      .getNonStandardAudio(this.selectedUser.id, this.selectedUser.firstName, this.selectedUser.lastName)
      .subscribe(data => {
        let urlBlob = URL.createObjectURL(data);
        this.audio = this.dom.bypassSecurityTrustUrl(urlBlob);
      });
  }



}
