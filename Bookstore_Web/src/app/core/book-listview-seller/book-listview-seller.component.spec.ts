import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListviewSellerComponent } from './book-listview-seller.component';

describe('BookListviewSellerComponent', () => {
  let component: BookListviewSellerComponent;
  let fixture: ComponentFixture<BookListviewSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListviewSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListviewSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
