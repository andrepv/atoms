import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypefaceSectionComponent } from './typeface-section.component';

describe('TypefaceComponent', () => {
  let component: TypefaceSectionComponent;
  let fixture: ComponentFixture<TypefaceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypefaceSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypefaceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
