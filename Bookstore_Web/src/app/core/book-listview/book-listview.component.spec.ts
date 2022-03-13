import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListviewComponent } from './book-listview.component';

describe('BookListviewComponent', () => {
  let component: BookListviewComponent;
  let fixture: ComponentFixture<BookListviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
