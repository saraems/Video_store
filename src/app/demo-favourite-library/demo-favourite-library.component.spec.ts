import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFavouriteLibraryComponent } from './demo-favourite-library.component';

describe('DemoFavouriteLibraryComponent', () => {
  let component: DemoFavouriteLibraryComponent;
  let fixture: ComponentFixture<DemoFavouriteLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoFavouriteLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoFavouriteLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
