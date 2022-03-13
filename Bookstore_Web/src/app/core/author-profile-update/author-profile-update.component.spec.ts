import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorProfileUpdateComponent } from './author-profile-update.component';

describe('AuthorProfileUpdateComponent', () => {
  let component: AuthorProfileUpdateComponent;
  let fixture: ComponentFixture<AuthorProfileUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorProfileUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
