import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BordersSectionComponent } from './borders-section.component';

describe('BordersSectionComponent', () => {
  let component: BordersSectionComponent;
  let fixture: ComponentFixture<BordersSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BordersSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BordersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
