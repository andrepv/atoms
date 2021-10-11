import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescaleTokenComponent } from './typescale-token.component';

describe('TypescaleTokenComponent', () => {
  let component: TypescaleTokenComponent;
  let fixture: ComponentFixture<TypescaleTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypescaleTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypescaleTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
