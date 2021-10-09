import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadedFontsComponent } from './loaded-fonts.component';

describe('LoadedFontsComponent', () => {
  let component: LoadedFontsComponent;
  let fixture: ComponentFixture<LoadedFontsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadedFontsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadedFontsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
