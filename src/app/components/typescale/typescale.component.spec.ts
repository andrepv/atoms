import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescaleComponent } from './typescale.component';

describe('TypescaleComponent', () => {
  let component: TypescaleComponent;
  let fixture: ComponentFixture<TypescaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypescaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypescaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
