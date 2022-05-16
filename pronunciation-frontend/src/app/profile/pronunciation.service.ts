import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PronunciationService {
  constructor(private http: HttpClient) { }

  private audioUrl = "https://ace-wording-350011.uc.r.appspot.com/pronunciation/english/"
  private spaceUrl = "%20"
  private audioType = "?gender=male&lang="
  //TODO need custom audio recorded url
  private customAudioUrl = "";

  getUserNameAudio(firstName: string, lastName: string): Observable<Blob> {
    return this.http.get<Blob>(this.audioUrl + firstName + this.spaceUrl + lastName + this.audioType, { observe: 'body', responseType: 'blob' as 'json' })
  }

  getUserRecordedAudio(){
    return this.http.get<Blob>(this.customAudioUrl, { observe: 'body', responseType: 'blob' as 'json' })
  }

}
