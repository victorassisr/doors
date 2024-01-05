import { TestBed } from '@angular/core/testing';

import { DoorService } from './door.service';
import { IFirstDoor } from '../interfaces/first-door.inteface';
import { ISecondDoor } from '../interfaces/second-door.interface';
import { IThirdDoor } from '../interfaces/third-door.inteface';

describe('DoorService', () => {
  let service: DoorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set first door not emited', () => {
    const firstDoor: IFirstDoor = {
      openedAt: 'test',
      openedDialog: false,
      openedDoor: true,
      padlock1: true,
      padlock2: true,
      padlock3: true
    };
    service.setFirstDoor(firstDoor, false);
    expect(service['doors'].firstDoor.openedAt).toEqual('test');
  });

  it('should set first door emited', () => {
    const firstDoor: IFirstDoor = {
      openedAt: 'test',
      openedDialog: false,
      openedDoor: true,
      padlock1: true,
      padlock2: true,
      padlock3: true
    };
    service.setFirstDoor(firstDoor);
    expect(service['doors'].firstDoor.openedAt).toEqual('test');
  });

  it('should set second door not emited', () => {
    const secondDoor: ISecondDoor = {
      openedAt: 'test',
      openedDialog: false,
      openedDoor: true,
      padlock1: true,
      padlock2: true,
      padlock3: true,
      enableBigPadlock: true,
      padlock4: true,
      padlockBigger: true
    };
    service.setSecondDoor(secondDoor, false);
    expect(service['doors'].secondDoor.openedAt).toEqual('test');
  });

  it('should set second door emited', () => {
    const secondDoor: ISecondDoor = {
      openedAt: 'test',
      openedDialog: false,
      openedDoor: true,
      padlock1: true,
      padlock2: true,
      padlock3: true,
      enableBigPadlock: true,
      padlock4: true,
      padlockBigger: true
    };
    service.setSecondDoor(secondDoor);
    expect(service['doors'].secondDoor.openedAt).toEqual('test');
  });

  it('should set third door not emited', () => {
    const thirdDoor: IThirdDoor = {
      openedAt: 'test',
      openedDialog: false,
      openedDoor: true,
      error: false,
      padlock: true,
      pass: ''
    };
    service.setThirdDoor(thirdDoor, false);
    expect(service['doors'].thirdDoor.openedAt).toEqual('test');
  });

  it('should set third door emited', () => {
    const thirdDoor: IThirdDoor = {
      openedAt: 'test',
      openedDialog: false,
      openedDoor: true,
      error: false,
      padlock: true,
      pass: ''
    };
    service.setThirdDoor(thirdDoor);
    expect(service['doors'].thirdDoor.openedAt).toEqual('test');
  });
});
