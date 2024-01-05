import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { IThirdDoor } from '../../interfaces/third-door.inteface';
import { DoorService } from '../../services/door.service';

@Component({
  selector: 'app-third-door',
  templateUrl: './third-door.component.html',
  styleUrls: ['./third-door.component.scss']
})
export class ThirdDoorComponent implements OnInit, OnDestroy {

  public door: IThirdDoor;
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
      padlock: false,
      pass: '',
      error: false
    };
  }

  ngOnInit(): void {
    this.sub.add(
      this.doorService.getDoors().subscribe(doors => {
        this.door = doors.thirdDoor;
        if(!doors.firstDoor.openedDoor || !doors.secondDoor.openedDoor) {
          this.doorService.restartDoors();
          this.router.navigate(['first-door']);
        } else if (doors.secondDoor.openedDoor && doors.secondDoor.openedDialog) {
          this.router.navigate(['second-door']);
        } else if(this.door.openedDoor && this.door.openedDialog) {
          this.openDialog(!this.door.error);
        } else if(this.door.openedDoor && !this.door.openedDialog) {
          this.router.navigate(['last-door']);
        } else if(!this.door.openedDoor && this.door.openedDialog) {
          this.openDialog(!this.door.error);
        }
      })
    );
  }

  clicked(target: any) {
    this.door.pass += target.innerText;
    this.doorService.setThirdDoor(this.door);
  }

  erase() {
    this.door.pass = '';
    this.doorService.setThirdDoor(this.door);
  }

  go() {
    if(this.door.pass == '28091998' && !this.door.openedDoor) {
      this.door.openedAt = new Date().toLocaleDateString("pt-BR", {hour: '2-digit', minute: '2-digit', second: '2-digit'});
      this.door.openedDoor = true;
      this.door.error = false;
      this.door.padlock = true;
      this.doorService.setThirdDoor(this.door, false);
      this.openDialog(true);
    } else {
      this.door.openedAt = '';
      this.door.openedDoor = false;
      this.door.error = true;
      this.door.padlock = false;
      this.doorService.setThirdDoor(this.door, false);
      this.openDialog(false);
    }
  }

  openDialog(opened: boolean): void {
    this.door.openedDialog = true;
    this.doorService.setThirdDoor(this.door, false);
    const dialogRef = this.dialog.open(DialogComponent, { width: '90%', maxWidth: '250px', data: {to: 'last-door', openedAt: this.door.openedAt, title: '', opened} });
    this.sub.add(
      dialogRef.afterClosed().subscribe(() => {
        this.door.openedDialog = false;
        this.doorService.setThirdDoor(this.door, false);
        if(opened) {
          this.router.navigate(['last-door']);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
