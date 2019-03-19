import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavouriteLibraryComponent } from './user-favourite-library.component';

describe('UserFavouriteLibraryComponent', () => {
  let component: UserFavouriteLibraryComponent;
  let fixture: ComponentFixture<UserFavouriteLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFavouriteLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFavouriteLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
