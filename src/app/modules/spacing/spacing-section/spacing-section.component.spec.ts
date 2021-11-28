import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacingSectionComponent } from './spacing-section.component';

describe('SpacingComponent', () => {
  let component: SpacingSectionComponent;
  let fixture: ComponentFixture<SpacingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacingSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
