import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypefaceListComponent } from './typeface-list.component';

describe('LoadedFontsComponent', () => {
  let component: TypefaceListComponent;
  let fixture: ComponentFixture<TypefaceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypefaceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypefaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
