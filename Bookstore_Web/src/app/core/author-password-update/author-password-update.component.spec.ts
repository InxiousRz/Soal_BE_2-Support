import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorPasswordUpdateComponent } from './author-password-update.component';

describe('AuthorPasswordUpdateComponent', () => {
  let component: AuthorPasswordUpdateComponent;
  let fixture: ComponentFixture<AuthorPasswordUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorPasswordUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorPasswordUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
