import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormUpdateComponent } from './book-form-update.component';

describe('BookFormUpdateComponent', () => {
  let component: BookFormUpdateComponent;
  let fixture: ComponentFixture<BookFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookFormUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
