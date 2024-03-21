import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseResuest } from '../response-resuest';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

isAuth$ = new BehaviorSubject<boolean>(false)

  constructor(
    private http : HttpClient,
    private localStorageService: LocalStorageService
  ) { 
    const token = localStorageService.getItem('token')
    const userId = localStorageService.getItem('userId')
     if(token && userId){
      this.verifyToken(token, userId)
     }
  }


  verifyToken(token: any, userId: any){
    const data = {token, userId}
    this.http.post<ResponseResuest>(environment.apiUrl+"user/verify/token",data).subscribe({
      next:(result: ResponseResuest)=> {
        this.emitAuth(result.isSuccess, data)
      }
    })
  }

  emitAuth(isSuccess: boolean, data:{ token: any , userId: any} ){
    this.isAuth$.next(isSuccess)
    if(isSuccess){
      this.localStorageService.setItem("token",data.token)
      this.localStorageService.setItem("userId", data.userId)
    } else{
      this.localStorageService.removeItem("token")
      this.localStorageService.removeItem("userId")
    }
  }

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
