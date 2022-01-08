import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorContrastCheckerComponent } from './color-contrast-checker.component';

describe('ColorContrastCheckerComponent', () => {
  let component: ColorContrastCheckerComponent;
  let fixture: ComponentFixture<ColorContrastCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorContrastCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorContrastCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
