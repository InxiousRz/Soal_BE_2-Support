import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueErrorComponent } from './dialogue-error.component';

describe('DialogueErrorComponent', () => {
  let component: DialogueErrorComponent;
  let fixture: ComponentFixture<DialogueErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
