import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFirstDoor } from '../interfaces/first-door.inteface';
import { ISecondDoor } from '../interfaces/second-door.interface';
import { IThirdDoor } from '../interfaces/third-door.inteface';

@Injectable({
  providedIn: 'root'
})
export class DoorService {

  constructor() {
    this.doors = new BehaviorSubject(this.initializeDoors());
    this.saveDoors();
   }

  private doors: any;

  setFirstDoor(door: IFirstDoor, emit: boolean = true): void {
    this.doors.firstDoor = door;
    if(emit) this.doors.next(this.doors.getValue());
    this.saveDoors();
  }

  setSecondDoor(door: ISecondDoor, emit: boolean = true): void {
    this.doors.secondDoor = door;
    if(emit) this.doors.next(this.doors.getValue());
    this.saveDoors();
  }

  setThirdDoor(door: IThirdDoor, emit: boolean = true): void {
    this.doors.thirdDoor = door;
    if(emit) this.doors.next(this.doors.getValue());
    this.saveDoors();
  }

  getDoors(): Observable<any> {
    return this.doors.asObservable();
  }

  private saveDoors() {
    localStorage.setItem('doors', JSON.stringify(this.doors.getValue()));
  }

  restartDoors() {
    this.doors = new BehaviorSubject(this.initializeDoors(true));
    this.saveDoors();
  }

  private initializeDoors(restart?: boolean) {
    const doors = localStorage.getItem('doors');
    if(doors && !restart) {
      return JSON.parse(doors);
    }
    return {
      firstDoor: {
        openedAt: '',
        openedDoor: false,
        padlock1: false,
        padlock2: false,
        padlock3: false,
        openedDialog: false
      },
      secondDoor: {
        openedAt: '',
        openedDoor: false,
        padlock1: false,
        padlock2: false,
        padlock3: false,
        padlock4: false,
        padlockBigger: false,
        openedDialog: false,
        enableBigPadlock: false
      },
      thirdDoor: {
        openedAt: '',
        openedDialog: false,
        openedDoor: false,
        padlock: false,
        pass: '',
        error: false
      }
    }
  }
}
