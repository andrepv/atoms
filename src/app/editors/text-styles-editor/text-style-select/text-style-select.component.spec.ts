import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextStyleSelectComponent } from './text-style-select.component';

describe('TextStyleSelectComponent', () => {
  let component: TextStyleSelectComponent;
  let fixture: ComponentFixture<TextStyleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextStyleSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextStyleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
