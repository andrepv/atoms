import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPaletteViewInlineComponent } from './color-palette-view-inline.component';

describe('ColorPaletteViewInlineComponent', () => {
  let component: ColorPaletteViewInlineComponent;
  let fixture: ComponentFixture<ColorPaletteViewInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPaletteViewInlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPaletteViewInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
