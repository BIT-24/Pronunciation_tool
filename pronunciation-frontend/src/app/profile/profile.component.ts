import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RecordDialogComponent} from "../record-dialog/record-dialog.component";
import {User} from "./user";
import {USER_DATA} from "../data";
import {PronunciationService} from "./pronunciation.service";

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
  user: User[] = USER_DATA;
  selectedUser: User = this.user[0]


  constructor(public dialog: MatDialog, private audioService: PronunciationService) {
  }

  ngOnInit() {

  }

  defaultPronunciation() {
    this.audioService.getUserNameAudio(this.selectedUser.firstName, this.selectedUser.lastName).subscribe()
  }

  userSelected(firstName: string) {
    this.selectedUser = this.user.filter(user => user.firstName === firstName)[0];
  }

  openRecordDialog() {
    this.dialog.open(RecordDialogComponent,
      {
        height: '250px',
        width: '250px',
        disableClose: true
      });
  }
}
