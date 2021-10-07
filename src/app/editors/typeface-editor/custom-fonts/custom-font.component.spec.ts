import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFontComponent } from './custom-font.component';

describe('CustomFontComponent', () => {
  let component: CustomFontComponent;
  let fixture: ComponentFixture<CustomFontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
