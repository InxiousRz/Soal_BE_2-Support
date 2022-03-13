import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNodeSellerComponent } from './book-node-seller.component';

describe('BookNodeSellerComponent', () => {
  let component: BookNodeSellerComponent;
  let fixture: ComponentFixture<BookNodeSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookNodeSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookNodeSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
