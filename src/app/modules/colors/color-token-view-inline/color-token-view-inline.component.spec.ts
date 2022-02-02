import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorTokenViewInlineComponent } from './color-token-view-inline.component';

describe('ColorTokenViewInlineComponent', () => {
  let component: ColorTokenViewInlineComponent;
  let fixture: ComponentFixture<ColorTokenViewInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorTokenViewInlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorTokenViewInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
