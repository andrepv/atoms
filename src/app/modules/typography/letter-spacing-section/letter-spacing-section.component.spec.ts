import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterSpacingSectionComponent } from './letter-spacing-section.component';

describe('LetterSpacingComponent', () => {
  let component: LetterSpacingSectionComponent;
  let fixture: ComponentFixture<LetterSpacingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterSpacingSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterSpacingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
