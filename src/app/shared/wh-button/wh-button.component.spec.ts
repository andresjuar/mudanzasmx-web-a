import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhButtonComponent } from './wh-button.component';

describe('WhButtonComponent', () => {
  let component: WhButtonComponent;
  let fixture: ComponentFixture<WhButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
