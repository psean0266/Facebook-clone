import { Injectable } from '@angular/core';
import { UiNotificationModel } from '../models/ui-notification-model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiNotificationService {
notification$ = new BehaviorSubject<UiNotificationModel|undefined>(undefined)
  constructor() { }

  emit(notification: UiNotificationModel){
    this.notification$.next(notification)
  }
}
