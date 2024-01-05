import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { ISecondDoor } from '../../interfaces/second-door.interface';
import { DoorService } from '../../services/door.service';

@Component({
  selector: 'app-second-door',
  templateUrl: './second-door.component.html',
  styleUrls: ['./second-door.component.scss']
})
export class SecondDoorComponent implements OnInit, OnDestroy {

  public door: ISecondDoor;
  private sub = new Subscription();

  constructor(
    private dialog: MatDialog,
    private doorService: DoorService,
    private router: Router
  ) {
    this.door = {
      openedAt: '',
      openedDialog: false,
      openedDoor: false,
      padlock1: false,
      padlock2: false,
      padlock3: false,
      padlock4: false,
      padlockBigger: false,
      enableBigPadlock: false
    };
  }

  ngOnInit(): void {
    this.sub.add(
      this.doorService.getDoors().subscribe(doors => {
        this.door = doors.secondDoor;
        if(!doors.firstDoor.openedDoor) {
          this.doorService.restartDoors();
          this.router.navigate(['first-door']);
        } else if(doors.firstDoor.openedDoor && doors.firstDoor.openedDialog) {
          this.router.navigate(['first-door']);
        } else if(this.door.openedDoor && this.door.openedDialog) {
          this.openDialog();
        } else if(this.door.openedDoor && !this.door.openedDialog) {
          this.router.navigate(['third-door']);
        }
      })
    );
  }

  togglePadlock(padlock: 'padlock1' | 'padlock2' | 'padlock3' | 'padlock4' | 'padlockBigger') {
    this.door[padlock] = !this.door[padlock];
    this.verifyIfPortCanBeOpened();
    this.doorService.setSecondDoor(this.door);
  }

  verifyIfPortCanBeOpened() {
    if(this.door.padlock1 && this.door.padlock2 && this.door.padlock3 && this.door.padlock4) {
      this.door.enableBigPadlock = true;
    }

    if(this.door.padlock1 && this.door.padlock2 && this.door.padlock3 && this.door.padlock4 && this.door.padlockBigger && !this.door.openedDoor) {
      this.door.openedAt = new Date().toLocaleDateString("pt-BR", {hour: '2-digit', minute: '2-digit', second: '2-digit'});
      this.door.openedDoor = true;
      this.doorService.setSecondDoor(this.door, false);
      this.openDialog();
    } else {
      this.door.openedAt = '';
      this.door.openedDoor = false;
      this.doorService.setSecondDoor(this.door, false);
    }
  }

  openDialog(): void {
    this.door.openedDialog = true;
    this.doorService.setSecondDoor(this.door, false);
    const dialogRef = this.dialog.open(DialogComponent, { width: '90%', maxWidth: '250px', data: {to: 'third-door', openedAt: this.door.openedAt, opened: true} });
    
    this.sub.add(
      dialogRef.afterClosed().subscribe(() => {
        this.door.openedDialog = false;
        this.doorService.setSecondDoor(this.door, false);
        this.router.navigate(['third-door']);
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
