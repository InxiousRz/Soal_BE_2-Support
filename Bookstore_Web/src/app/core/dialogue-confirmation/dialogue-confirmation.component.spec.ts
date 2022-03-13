import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueConfirmationComponent } from './dialogue-confirmation.component';

describe('DialogueConfirmationComponent', () => {
  let component: DialogueConfirmationComponent;
  let fixture: ComponentFixture<DialogueConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
