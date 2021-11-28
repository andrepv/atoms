import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineHeightSectionComponent } from './line-height-section.component';

describe('LineHeightComponent', () => {
  let component: LineHeightSectionComponent;
  let fixture: ComponentFixture<LineHeightSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineHeightSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineHeightSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
