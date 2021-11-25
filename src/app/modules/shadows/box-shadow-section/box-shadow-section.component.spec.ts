import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxShadowSectionComponent } from './box-shadow-section.component';

describe('BoxShadowSectionComponent', () => {
  let component: BoxShadowSectionComponent;
  let fixture: ComponentFixture<BoxShadowSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxShadowSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxShadowSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
