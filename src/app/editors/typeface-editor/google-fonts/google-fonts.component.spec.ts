import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleFontsComponent } from './google-fonts.component';

describe('GoogleFontsComponent', () => {
  let component: GoogleFontsComponent;
  let fixture: ComponentFixture<GoogleFontsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleFontsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleFontsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
