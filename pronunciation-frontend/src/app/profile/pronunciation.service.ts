import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PronunciationService {
  constructor(private http: HttpClient) { }

  private standardAudioUrl = "https://ace-wording-350011.uc.r.appspot.com/pronunciation/english/"
  private spaceUrl = "%20"
  private audioType = "?gender=male&lang="
  //TODO need custom audio recorded url
  private getNonStandardAudioUrl = "https://pronunciation-api-cr-i7w2fpsyrq-uc.a.run.app/bit24/api/pronunciation/non-standard?userName=";
  private sendNonStandardAudioUrl = "https://pronunciation-api-cr-i7w2fpsyrq-uc.a.run.app/bit24/api/pronunciation/non-standard";

  getStandardAudio(firstName: string, lastName: string): Observable<Blob> {
    return this.http.get<Blob>(this.standardAudioUrl + firstName + this.spaceUrl + lastName + this.audioType, { observe: 'body', responseType: 'blob' as 'json' })
  }

  getNonStandardAudio(id: string, firstName: string, lastName: string): Observable<Blob>{
    return this.http.get<Blob>(this.getNonStandardAudioUrl + id + firstName +lastName, { observe: 'body', responseType: 'blob' as 'json' })
  }

  addNonStandardAudio(formData: FormData): Observable<any>{
    return this.http.post<any>(this.sendNonStandardAudioUrl, formData)
  }

}
