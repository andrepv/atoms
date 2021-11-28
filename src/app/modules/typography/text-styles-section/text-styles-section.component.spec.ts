import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextStylesSectionComponent } from './text-styles-section.component';

describe('TextStylesComponent', () => {
  let component: TextStylesSectionComponent;
  let fixture: ComponentFixture<TextStylesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextStylesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextStylesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
