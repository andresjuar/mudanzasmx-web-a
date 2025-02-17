import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncComponent } from './func.component';

describe('FuncComponent', () => {
  let component: FuncComponent;
  let fixture: ComponentFixture<FuncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
