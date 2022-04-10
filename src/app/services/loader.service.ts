import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }
  show(textLoader: string): void {
    this.loaderSubject.next({ show: true, text: textLoader } as LoaderState);
  }
  hide(): void {
    this.loaderSubject.next({ show: false, text: '' } as LoaderState);
  }
}

export interface LoaderState {
  show: boolean;
  text: string;
}


