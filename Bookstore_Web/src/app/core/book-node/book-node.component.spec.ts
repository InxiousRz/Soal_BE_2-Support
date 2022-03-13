import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNodeComponent } from './book-node.component';

describe('BookNodeComponent', () => {
  let component: BookNodeComponent;
  let fixture: ComponentFixture<BookNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
