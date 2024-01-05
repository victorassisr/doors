import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstDoorComponent } from './first-door.component';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { IFirstDoor } from 'src/app/interfaces/first-door.inteface';

describe('FirstDoorComponent', () => {
  let component: FirstDoorComponent;
  let fixture: ComponentFixture<FirstDoorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstDoorComponent],
      imports: [MatDialogModule]
    });
    fixture = TestBed.createComponent(FirstDoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get doors on init and open dialog', () => {
    const firstDoor: IFirstDoor = {
      openedAt: 'test',
      openedDialog: true,
      openedDoor: true,
      padlock1: true,
      padlock2: true,
      padlock3: true
    };
    const dialogSpy = jest.spyOn(component, 'openDialog');
    jest.spyOn(component['doorService'], 'getDoors').mockReturnValueOnce(of({firstDoor}));
    component.ngOnInit();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should get doors on init and redirect to second door', () => {
    const firstDoor: IFirstDoor = {
      openedAt: 'test',
      openedDialog: false,
      openedDoor: true,
      padlock1: true,
      padlock2: true,
      padlock3: true
    };
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    jest.spyOn(component['doorService'], 'getDoors').mockReturnValueOnce(of({firstDoor}));
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should open and close dialog', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    jest.spyOn(component['dialog'], 'open').mockReturnValueOnce({
      afterClosed: () => of({}),
    } as unknown as any);
    component.openDialog();
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should toggle status of padlock', () => {
    expect(component.door.padlock2).toBeFalsy();
    component.togglePadlock('padlock2');
    expect(component.door.padlock2).toBeTruthy();
  });

  it('should verify if port is opened', () => {
    const firstDoor: IFirstDoor = {
      openedAt: 'test',
      openedDialog: false,
      openedDoor: false,
      padlock1: true,
      padlock2: true,
      padlock3: true
    };
    component.door = firstDoor;
    expect(component.door.openedDoor).toBeFalsy();
    component.verifyIfPortCanBeOpened();
    expect(component.door.openedDoor).toBeTruthy();
  });

  it('should verify if port is closed', () => {
    const firstDoor: IFirstDoor = {
      openedAt: 'test',
      openedDialog: false,
      openedDoor: false,
      padlock1: true,
      padlock2: false,
      padlock3: true
    };
    component.door = firstDoor;
    expect(component.door.openedDoor).toBeFalsy();
    component.verifyIfPortCanBeOpened();
    expect(component.door.openedDoor).toBeFalsy();
  });
});
