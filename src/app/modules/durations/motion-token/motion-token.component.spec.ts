import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotionTokenComponent } from './motion-token.component';

describe('MotionTokenComponent', () => {
  let component: MotionTokenComponent;
  let fixture: ComponentFixture<MotionTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotionTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotionTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
