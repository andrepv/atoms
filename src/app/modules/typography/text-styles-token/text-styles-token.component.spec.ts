import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextStylesTokenComponent } from './text-styles-token.component';

describe('TextStylesTokenComponent', () => {
  let component: TextStylesTokenComponent;
  let fixture: ComponentFixture<TextStylesTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextStylesTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextStylesTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
