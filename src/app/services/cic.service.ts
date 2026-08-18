import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CicService {

  private selectionSubject = new Subject<any>();

  selection$ = this.selectionSubject.asObservable();

  sendSelection(value: any) {
    this.selectionSubject.next(value);
  }

  constructor() { }
}
