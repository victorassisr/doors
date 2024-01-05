import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondDoorComponent } from './second-door.component';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('SecondDoorComponent', () => {
  let component: SecondDoorComponent;
  let fixture: ComponentFixture<SecondDoorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondDoorComponent],
      imports: [MatDialogModule, RouterTestingModule.withRoutes([])]
    });
    fixture = TestBed.createComponent(SecondDoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should restart the app state', () => {
    const door = {
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
    jest.spyOn(component['doorService'], 'getDoors').mockReturnValueOnce(of({firstDoor: {openedDoor: false}, secondDoor: door}));
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    const serviceSpy = jest.spyOn(component['doorService'], 'restartDoors');
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith(['first-door']);
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('Should back to first door without restart because dialog is opened on first door', () => {
    const door = {
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
    jest.spyOn(component['doorService'], 'getDoors').mockReturnValueOnce(of({firstDoor: {openedDoor: true, openedDialog: true}, secondDoor: door}));
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    const serviceSpy = jest.spyOn(component['doorService'], 'restartDoors');
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith(['first-door']);
    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('Should open dialog', () => {
    const door = {
      openedAt: '',
      openedDialog: true,
      openedDoor: true,
      padlock1: false,
      padlock2: false,
      padlock3: false,
      padlock4: false,
      padlockBigger: false,
      enableBigPadlock: false
    };
    jest.spyOn(component['doorService'], 'getDoors').mockReturnValueOnce(of({firstDoor: {openedDoor: true, openedDialog: false}, secondDoor: door}));
    const dialogSpy = jest.spyOn(component, 'openDialog');
    component.ngOnInit();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('Should navigate to third door', () => {
    const door = {
      openedAt: '',
      openedDialog: false,
      openedDoor: true,
      padlock1: false,
      padlock2: false,
      padlock3: false,
      padlock4: false,
      padlockBigger: false,
      enableBigPadlock: false
    };
    jest.spyOn(component['doorService'], 'getDoors').mockReturnValueOnce(of({firstDoor: {openedDoor: true, openedDialog: false}, secondDoor: door}));
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should toggle status of padlock', () => {
    expect(component.door.padlock2).toBeFalsy();
    component.togglePadlock('padlock2');
    expect(component.door.padlock2).toBeTruthy();
  });

  it('should verify if port is opened', () => {
    component.door.padlock1 = true;
    component.door.padlock2 = true;
    component.door.padlock3 = true;
    component.door.padlock4 = true;
    component.door.padlockBigger = true;
    component.door.openedDoor = false;

    const dialogSpy = jest.spyOn(component, 'openDialog');

    component.verifyIfPortCanBeOpened();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should verify if port is opened', () => {
    component.door.padlock1 = true;
    component.door.padlock2 = true;
    component.door.padlock3 = true;
    component.door.padlock4 = true;
    component.door.padlockBigger = false;
    component.door.openedDoor = false;

    const dialogSpy = jest.spyOn(component, 'openDialog');

    component.verifyIfPortCanBeOpened();
    expect(dialogSpy).not.toHaveBeenCalled();
  });

  it('should open and close dialog', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    jest.spyOn(component['dialog'], 'open').mockReturnValueOnce({
      afterClosed: () => of({}),
    } as unknown as any);
    component.openDialog();
    expect(navigateSpy).toHaveBeenCalled();
  });
});
