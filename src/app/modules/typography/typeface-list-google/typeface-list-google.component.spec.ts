import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypefaceListGoogleComponent } from './typeface-list-google.component';

describe('GoogleFontsComponent', () => {
  let component: TypefaceListGoogleComponent;
  let fixture: ComponentFixture<TypefaceListGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypefaceListGoogleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypefaceListGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
