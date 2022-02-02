import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupViewListComponent } from './group-view-list.component';

describe('GroupViewListComponent', () => {
  let component: GroupViewListComponent;
  let fixture: ComponentFixture<GroupViewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupViewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
