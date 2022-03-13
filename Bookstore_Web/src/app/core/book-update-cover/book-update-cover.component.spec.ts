import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookUpdateCoverComponent } from './book-update-cover.component';

describe('BookUpdateCoverComponent', () => {
  let component: BookUpdateCoverComponent;
  let fixture: ComponentFixture<BookUpdateCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookUpdateCoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookUpdateCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
