import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { IFirstDoor } from '../../interfaces/first-door.inteface';
import { DoorService } from '../../services/door.service';

@Component({
  selector: 'app-first-door',
  templateUrl: './first-door.component.html',
  styleUrls: ['./first-door.component.scss']
})
export class FirstDoorComponent implements OnInit, OnDestroy {

  constructor(
    private dialog: MatDialog,
    private doorService: DoorService,
    private router: Router
  ) {
    this.door = {
      openedAt: '',
      openedDoor: false,
      padlock1: false,
      padlock2: false,
      padlock3: false,
      openedDialog: false
    };
  }

  public door: IFirstDoor;
  private sub = new Subscription();

  ngOnInit(): void {
    this.sub.add(
      this.doorService.getDoors().subscribe(doors => {
        this.door = doors.firstDoor;
        if(this.door.openedDoor && this.door.openedDialog) {
          this.openDialog();
        } else if(this.door.openedDoor && !this.door.openedDialog) {
          this.router.navigate(['second-door']);
        }
      })
    );
  }

  openDialog(): void {
    this.door.openedDialog = true;
    this.doorService.setFirstDoor(this.door, false);
    const dialogRef = this.dialog.open(DialogComponent, { width: '90%', maxWidth: '250px', data: {to: 'second-door', openedAt: this.door.openedAt, opened: true} });

      dialogRef.afterClosed().pipe(take(1)).subscribe(() => {
        this.door.openedDialog = false;
        this.doorService.setFirstDoor(this.door, false);
        this.router.navigate(['second-door']);
      });
  }

  togglePadlock(padlock: 'padlock1' | 'padlock2' | 'padlock3') {
    this.door[padlock] = !this.door[padlock];
    this.verifyIfPortCanBeOpened();
    this.doorService.setFirstDoor(this.door);
  }

  verifyIfPortCanBeOpened() {
    if(this.door.padlock1 && this.door.padlock2 && this.door.padlock3 && !this.door.openedDoor) {
      this.door.openedAt = new Date().toLocaleDateString("pt-BR", {hour: '2-digit', minute: '2-digit', second: '2-digit'});
      this.door.openedDoor = true;
      this.doorService.setFirstDoor(this.door, false);
      this.openDialog();
    } else {
      this.door.openedAt = '';
      this.door.openedDoor = false;
      this.doorService.setFirstDoor(this.door, false);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
