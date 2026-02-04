import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesDetail } from './solicitudes-detail';

describe('SolicitudesDetail', () => {
  let component: SolicitudesDetail;
  let fixture: ComponentFixture<SolicitudesDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
