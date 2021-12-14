import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTokensSectionComponent } from './custom-tokens-section.component';

describe('CustomTokensSectionComponent', () => {
  let component: CustomTokensSectionComponent;
  let fixture: ComponentFixture<CustomTokensSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTokensSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTokensSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
