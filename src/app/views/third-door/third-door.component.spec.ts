import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdDoorComponent } from './third-door.component';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { IThirdDoor } from 'src/app/interfaces/third-door.inteface';
import { RouterTestingModule } from '@angular/router/testing';

describe('ThirdDoorComponent', () => {
  let component: ThirdDoorComponent;
  let fixture: ComponentFixture<ThirdDoorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThirdDoorComponent],
      imports: [MatDialogModule, RouterTestingModule.withRoutes([])],
    });
    fixture = TestBed.createComponent(ThirdDoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jest.spyOn(component['router'], 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should restart the app state', () => {
    const door: IThirdDoor = {
      error: false,
      openedAt: '',
      openedDialog: false,
      openedDoor: false,
      padlock: false,
      pass: ''
    };
    jest.spyOn(component['doorService'], 'getDoors').mockReturnValueOnce(of({firstDoor: {openedDoor: true}, secondDoor: {openedDoor: false}, thirdDoor: door}));
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    const serviceSpy = jest.spyOn(component['doorService'], 'restartDoors');
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith(['first-door']);
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('Should navigate to second door because dialog is open', () => {
    const door: IThirdDoor = {
      error: false,
      openedAt: '',
      openedDialog: false,
      openedDoor: false,
      padlock: false,
      pass: ''
    };
    jest.spyOn(component['doorService'], 'getDoors').mockReturnValueOnce(of({firstDoor: {openedDoor: true}, secondDoor: {openedDoor: true, openedDialog: true}, thirdDoor: door}));
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    const serviceSpy = jest.spyOn(component['doorService'], 'restartDoors');
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith(['second-door']);
    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('Should open dialog without error', () => {
    const door: IThirdDoor = {
      error: false,
      openedAt: '',
      openedDialog: true,
      openedDoor: true,
      padlock: true,
      pass: '12345'
    };
    jest.spyOn(component['doorService'], 'getDoors').mockReturnValueOnce(of({firstDoor: {openedDoor: true}, secondDoor: {openedDoor: true, openedDialog: false}, thirdDoor: door}));
    const dialogSpy = jest.spyOn(component, 'openDialog');
    component.ngOnInit();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('Should navigate to last door', () => {
    const door: IThirdDoor = {
      error: false,
      openedAt: '',
      openedDialog: false,
      openedDoor: true,
      padlock: true,
      pass: ''
    };
    jest.spyOn(component['doorService'], 'getDoors').mockReturnValueOnce(of({firstDoor: {openedDoor: true}, secondDoor: {openedDoor: true, openedDialog: false}, thirdDoor: door}));
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith(['last-door']);
  });

  it('Should open dialog with error', () => {
    const door: IThirdDoor = {
      error: true,
      openedAt: '',
      openedDialog: true,
      openedDoor: false,
      padlock: true,
      pass: '12345'
    };
    jest.spyOn(component['doorService'], 'getDoors').mockReturnValueOnce(of({firstDoor: {openedDoor: true}, secondDoor: {openedDoor: true, openedDialog: false}, thirdDoor: door}));
    const dialogSpy = jest.spyOn(component, 'openDialog');
    component.ngOnInit();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('Should create pass string', () => {
    component.door = {
      error: true,
      openedAt: '',
      openedDialog: true,
      openedDoor: false,
      padlock: true,
      pass: '12345'
    };
    const btn = document.createElement('button');
    btn.innerText = '6';
    component.clicked(btn);
    expect(component.door.pass).toEqual('123456');
  });

  it('Should clean the pass', () => {
    component.door = {
      error: true,
      openedAt: '',
      openedDialog: true,
      openedDoor: false,
      padlock: true,
      pass: '12345'
    };
    component.erase();
    expect(component.door.pass).toEqual('');
  });

  it('Should open door and call dialog', () => {
    component.door = {
      error: false,
      openedAt: '',
      openedDialog: true,
      openedDoor: false,
      padlock: true,
      pass: '28091998'
    };
    const dialogSpy = jest.spyOn(component, 'openDialog');
    component.go();
    expect(component.door.openedDoor).toBeTruthy();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('Should close door and call error dialog', () => {
    component.door = {
      error: true,
      openedAt: '',
      openedDialog: true,
      openedDoor: false,
      padlock: true,
      pass: '2809'
    };
    const dialogSpy = jest.spyOn(component, 'openDialog');
    component.go();
    expect(component.door.openedDoor).toBeFalsy();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should open and close dialog and not navigate', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    jest.spyOn(component['dialog'], 'open').mockReturnValueOnce({
      afterClosed: () => of({}),
    } as unknown as any);
    component.openDialog(false);
    expect(navigateSpy).not.toHaveBeenCalledWith(['last-door']);
  });

  it('should open and close dialog and navigate', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    jest.spyOn(component['dialog'], 'open').mockReturnValueOnce({
      afterClosed: () => of({}),
    } as unknown as any);
    component.openDialog(true);
    expect(navigateSpy).toHaveBeenCalledWith(['last-door']);
  });
});
