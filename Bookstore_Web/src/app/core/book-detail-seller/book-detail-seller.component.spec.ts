import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailSellerComponent } from './book-detail-seller.component';

describe('BookDetailSellerComponent', () => {
  let component: BookDetailSellerComponent;
  let fixture: ComponentFixture<BookDetailSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDetailSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
