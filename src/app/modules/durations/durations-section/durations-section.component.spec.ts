import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationsSectionComponent } from './durations-section.component';

describe('DurationsSectionComponent', () => {
  let component: DurationsSectionComponent;
  let fixture: ComponentFixture<DurationsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DurationsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
