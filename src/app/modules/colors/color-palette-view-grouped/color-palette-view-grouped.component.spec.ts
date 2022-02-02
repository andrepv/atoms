import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPaletteViewGroupedComponent } from './color-palette-view-grouped.component';

describe('ColorPaletteViewGroupedComponent', () => {
  let component: ColorPaletteViewGroupedComponent;
  let fixture: ComponentFixture<ColorPaletteViewGroupedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPaletteViewGroupedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPaletteViewGroupedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
