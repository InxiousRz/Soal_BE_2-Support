import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueInfoComponent } from './dialogue-info.component';

describe('DialogueInfoComponent', () => {
  let component: DialogueInfoComponent;
  let fixture: ComponentFixture<DialogueInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
