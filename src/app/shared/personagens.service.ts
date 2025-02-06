import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonagemService {

  private favoriteCountSubject = new BehaviorSubject<number>(0);
  favoriteCount$ = this.favoriteCountSubject.asObservable();
  private api = environment.api; 
  

  constructor(private http: HttpClient) {}

  getPersonagem(): Observable<any> {
    return this.http.get<any>(`${this.api}/character`);
  }

  updateFavoriteCount(count: number) {
    this.favoriteCountSubject.next(count);
  }
}
