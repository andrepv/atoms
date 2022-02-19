import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypefaceListSelectComponent } from './typeface-list-select.component';

describe('TypefaceListSelectComponent', () => {
  let component: TypefaceListSelectComponent;
  let fixture: ComponentFixture<TypefaceListSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypefaceListSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypefaceListSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
