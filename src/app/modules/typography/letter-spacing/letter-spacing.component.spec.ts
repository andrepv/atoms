import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterSpacingComponent } from './letter-spacing.component';

describe('LetterSpacingComponent', () => {
  let component: LetterSpacingComponent;
  let fixture: ComponentFixture<LetterSpacingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterSpacingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterSpacingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
