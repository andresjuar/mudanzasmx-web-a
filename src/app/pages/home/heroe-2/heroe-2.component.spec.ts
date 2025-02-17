import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Heroe2Component } from './heroe-2.component';

describe('Heroe2Component', () => {
  let component: Heroe2Component;
  let fixture: ComponentFixture<Heroe2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Heroe2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Heroe2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
