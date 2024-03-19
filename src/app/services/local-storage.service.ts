import { Injectable } from '@angular/core';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  
  getItem(key:string){
    try{

      const item: any = localStorage.getItem(key)
      return JSON.parse(item)
    } catch(error)
    {
       return null
    }
  }

  setItem(key: string, value: any){
   if(window.localStorage){
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
   }
   return false
  }

  removeItem(key: string){
    if(window.localStorage){
     localStorage.removeItem(key)
     return true
    }
    return null
   }

   clear(){
    try{
     localStorage.clear()     
     return true
    } catch(error)
    {
       return null
    }
  }
}
