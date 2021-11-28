import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescaleSectionComponent } from './typescale-section.component';

describe('TypescaleComponent', () => {
  let component: TypescaleSectionComponent;
  let fixture: ComponentFixture<TypescaleSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypescaleSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypescaleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
