import { Component, OnInit } from '@angular/core';
import {User} from "./user";
import {USER_DATA} from "../data";

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
  id: string = "12345678"
  firstName: string = "Vishal";
  lastName: string = "Barot";
  title: string = "Engineering Associate"
  department: string = "Home Landing"
  center: string = "12345678"
  mac: string = "N9409-24"
  address: string = "2801 4th Ave S Minneapolis, MN 4444-0034 USA"
  cityState: string = "Minneapolis, MN"
  country: string = "USA"
  user: User[] = USER_DATA;
  selectedUser: User = this.user[0]

  ngOnInit() {

  }

  userSelected(firstName: string) {
    this.selectedUser = this.user.filter(user => user.firstName === firstName)[0];

  }
}
