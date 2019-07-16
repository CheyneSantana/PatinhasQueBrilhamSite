import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupInteressadosComponent } from './popup-interessados.component';

describe('PopupInteressadosComponent', () => {
  let component: PopupInteressadosComponent;
  let fixture: ComponentFixture<PopupInteressadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupInteressadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupInteressadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
