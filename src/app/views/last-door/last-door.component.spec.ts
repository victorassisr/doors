import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastDoorComponent } from './last-door.component';
import { IThirdDoor } from 'src/app/interfaces/third-door.inteface';
import { of } from 'rxjs';

describe('LastDoorComponent', () => {
  let component: LastDoorComponent;
  let fixture: ComponentFixture<LastDoorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LastDoorComponent]
    });
    fixture = TestBed.createComponent(LastDoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should restart the app state', () => {
    jest.spyOn(component['doorService'], 'getDoors').mockReturnValueOnce(of({firstDoor: {openedDoor: true}, secondDoor: {openedDoor: false}, thirdDoor: {openedDoor: false}}));
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    const serviceSpy = jest.spyOn(component['doorService'], 'restartDoors');
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith(['first-door']);
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('Should navigate to third port because dialog is opened', () => {
    jest.spyOn(component['doorService'], 'getDoors').mockReturnValueOnce(of({firstDoor: {openedDoor: true}, secondDoor: {openedDoor: true}, thirdDoor: {openedDoor: true, openedDialog: true}}));
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    const serviceSpy = jest.spyOn(component['doorService'], 'restartDoors');
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith(['third-door']);
    expect(serviceSpy).not.toHaveBeenCalled();
  });
});
