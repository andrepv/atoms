import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotionGroupComponent } from './motion-group.component';

describe('MotionGroupComponent', () => {
  let component: MotionGroupComponent;
  let fixture: ComponentFixture<MotionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotionGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
