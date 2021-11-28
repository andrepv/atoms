import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPaletteSectionComponent } from './color-palette-section.component';

describe('ColorPaletteComponent', () => {
  let component: ColorPaletteSectionComponent;
  let fixture: ComponentFixture<ColorPaletteSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPaletteSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPaletteSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
