import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenNameComponent } from './token-name.component';

describe('TokenNameComponent', () => {
  let component: TokenNameComponent;
  let fixture: ComponentFixture<TokenNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
