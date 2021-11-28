import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderRadiusSectionComponent } from './border-radius-section.component';

describe('BorderRadiusComponent', () => {
  let component: BorderRadiusSectionComponent;
  let fixture: ComponentFixture<BorderRadiusSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorderRadiusSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorderRadiusSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
