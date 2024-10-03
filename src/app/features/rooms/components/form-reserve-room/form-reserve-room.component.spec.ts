import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReserveRoomComponent } from './form-reserve-room.component';

describe('FormReserveRoomComponent', () => {
  let component: FormReserveRoomComponent;
  let fixture: ComponentFixture<FormReserveRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormReserveRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormReserveRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
