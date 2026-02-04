import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesForm } from './solicitudes-form';

describe('SolicitudesForm', () => {
  let component: SolicitudesForm;
  let fixture: ComponentFixture<SolicitudesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
