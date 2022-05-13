import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PronunciationService {

  constructor(private http: HttpClient) { }
  audioUrl = "https://ace-wording-350011.uc.r.appspot.com/pronunciation/english/"
  spaceUrl = "%20"
  audioType = "?gender=male&lang="

  getUserNameAudio(firstName: string, lastName: string): Observable<any>{
    return this.http.get(this.audioUrl+firstName+this.spaceUrl+lastName+this.audioType);
  }

}
