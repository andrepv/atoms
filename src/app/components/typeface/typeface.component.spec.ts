import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypefaceComponent } from './typeface.component';

describe('TypefaceComponent', () => {
  let component: TypefaceComponent;
  let fixture: ComponentFixture<TypefaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypefaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypefaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
