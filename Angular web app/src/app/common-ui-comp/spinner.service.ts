import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private  count = 0;
  private spinner$ = new BehaviorSubject<string>('')

  constructor() { }
  getSpinnerObservable(): Observable<string>{
    return this.spinner$.asObservable();
  }

  startSpinner(){
    if(++this.count ===1){
      this.spinner$.next('start');
    }
  }
  endSpinner(){
    if(this.count===0 || --this.count===0){
      this.spinner$.next('stop');
    }
  }
  resetSpinner(){
    this.count = 0;
    this.spinner$.next('stop');
  }
}
