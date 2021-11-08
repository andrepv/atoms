import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenEditableComponent } from './token-editable.component';

describe('EditableTokenComponent', () => {
  let component: TokenEditableComponent;
  let fixture: ComponentFixture<TokenEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenEditableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
