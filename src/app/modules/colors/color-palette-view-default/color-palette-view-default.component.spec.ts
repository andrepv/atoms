import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPaletteViewDefaultComponent } from './color-palette-view-default.component';

describe('ColorPaletteViewDefaultComponent', () => {
  let component: ColorPaletteViewDefaultComponent;
  let fixture: ComponentFixture<ColorPaletteViewDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPaletteViewDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPaletteViewDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
