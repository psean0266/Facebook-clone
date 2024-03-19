import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';
import { Observable } from 'rxjs';
import { ResponseResuest } from '../response-resuest';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  signup(user: User): Observable<ResponseResuest>{
      return this.http.post<ResponseResuest>(environment.apiUrl+"user/signup", user)
  }
  
  signin(user: User): Observable<ResponseResuest>{
    return this.http.post<ResponseResuest>(environment.apiUrl+"user/signin", user)
}

 logout(){
      this.localStorageService.removeItem("token")
      this.localStorageService.removeItem("userId")
 }

}
