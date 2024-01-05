import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DoorService } from '../../services/door.service';

@Component({
  selector: 'app-last-door',
  templateUrl: './last-door.component.html',
  styleUrls: ['./last-door.component.scss']
})
export class LastDoorComponent implements OnInit, OnDestroy {

  private sub = new Subscription();

  constructor(
    private doorService: DoorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.doorService.getDoors().subscribe(doors => {
        if(!doors.firstDoor.openedDoor || !doors.secondDoor.openedDoor || !doors.thirdDoor.openedDoor) {
          this.restart();
        } else if (doors.thirdDoor.openedDoor && doors.thirdDoor.openedDialog) {
          this.router.navigate(['third-door']);
        }
      })
    );
  }

  restart() {
    this.doorService.restartDoors();
    this.router.navigate(['first-door']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
